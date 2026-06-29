import { gitConfig, githubUrl } from '@/lib/shared'

const installerFileName = 'Remaku_Setup.exe'
const releasesApiUrl = `https://api.github.com/repos/${gitConfig.user}/${gitConfig.appRepo}/releases?per_page=10`

export const remakuInstallerFileName = installerFileName
export const latestInstallerDownloadUrl = `${githubUrl}/releases/latest/download/${installerFileName}`

export type RemakuRelease = {
  version: string
  publishedAt: string
  releaseUrl: string
  downloadUrl: string
}

export type RemakuReleasesResult = {
  latest: RemakuRelease
  releases: RemakuRelease[]
  unavailable: boolean
}

const fallbackRelease: RemakuRelease = {
  version: 'latest',
  publishedAt: '',
  releaseUrl: `${githubUrl}/releases/latest`,
  downloadUrl: latestInstallerDownloadUrl,
}

export async function getRemakuReleases(): Promise<RemakuReleasesResult> {
  try {
    const response = await fetch(releasesApiUrl, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'remaku-website',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: {
        revalidate: 60 * 5,
        tags: ['github-releases'],
      },
    })

    if (!response.ok) return unavailableResult()

    const payload: unknown = await response.json()

    if (!Array.isArray(payload)) return unavailableResult()

    const releases = payload
      .map((release) => normalizeRelease(release))
      .filter((release): release is RemakuRelease => release !== null)

    if (releases.length === 0) return unavailableResult()

    const latest = releases[0]

    if (!latest) return unavailableResult()

    return {
      latest,
      releases,
      unavailable: false,
    }
  } catch {
    return unavailableResult()
  }
}

function unavailableResult(): RemakuReleasesResult {
  return {
    latest: fallbackRelease,
    releases: [],
    unavailable: true,
  }
}

function normalizeRelease(value: unknown): RemakuRelease | null {
  const release = asRecord(value)

  if (!release) return null
  if (release.draft !== false || release.prerelease !== false) return null
  if (typeof release.tag_name !== 'string') return null
  if (typeof release.published_at !== 'string') return null
  if (typeof release.html_url !== 'string') return null
  if (!Array.isArray(release.assets)) return null

  const installerAsset = release.assets
    .map((asset) => asRecord(asset))
    .find((asset) => asset?.name === installerFileName)

  if (typeof installerAsset?.browser_download_url !== 'string') return null

  return {
    version: release.tag_name,
    publishedAt: release.published_at,
    releaseUrl: release.html_url,
    downloadUrl: installerAsset.browser_download_url,
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null

  return value as Record<string, unknown>
}
