import { fixturesFetch } from "@/lib/api/fixtures/FixturesFetch"

export const getPredictionMatchById = async (id: string | number) => {
  try {
    const res = await fixturesFetch()
    if (res?.status && res?.data?.predictions) {
      const match = res.data.predictions.find(
        (p: any) => p.id.toString() === id.toString()
      )
      return match || null
    }
    return null
  } catch (error) {
    console.error('Get Prediction Match error:', error)
    return null
  }
}