import { apiFetch } from "../apiFetch"

export const FixturesIdViewHighlightsFetch = async (id: string) => {
  try {
    const res = await apiFetch(`/fixtures/view-highlights/${id}`, {
      method: 'GET'
    })
    return res
  } catch (error) {
    console.error("View Highlights Fetch Error:", error)
    return null
  }
}