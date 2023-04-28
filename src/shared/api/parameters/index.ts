import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import { paramsAPI } from './types'

const BASE_URL = 'https://carvago-server.vercel.app'
const DEV_URL = 'https://developers.ria.com'
const API_KEY = 'OPwZPrUVHfTeBKgJuwMMA83lTtsxViyWUyE9Ljr5'

export function useCategories() {
  return useQuery(['categories'], () => {
    return fetch(`${BASE_URL}/api/categories`).then(r => r.json())
  })
}

export function useMarks() {
  return useQuery(['marks'], async () => {
    return z.array(paramsAPI)
      .parse(await fetch(`${BASE_URL}/api/categories/1/marks`)
        .then(r => r.json()))
  })
}

export function useModels(markId: number | undefined) {
  return useQuery(['marks', markId, 'models'], async () => {
    if (markId === undefined)
      throw new Error('mark is undefined')
    return z.array(paramsAPI)
      .parse(await fetch(`${BASE_URL}/api/categories/1/marks/${markId}/models`)
        .then(r => r.json()))
  }, { enabled: !!markId })
}

export function useRegions() {
  return useQuery(['regions'], async () => {
    return z.array(paramsAPI)
      .parse(await fetch(`${BASE_URL}/api/states`)
        .then(r => r.json()))
  })
}

export function useCities(regionId: number | undefined) {
  return useQuery(['regions', regionId, 'cities'], async () => {
    if (regionId === undefined)
      throw new Error('region is undefined')
    return z.array(paramsAPI)
      .parse(await fetch(`${BASE_URL}/api/states/${regionId}/cities`)
        .then(r => r.json()))
  }, { enabled: !!regionId })
}

export function useDriverType() {
  return useQuery(['driverType'], async () => {
    return z.array(paramsAPI)
      .parse(await fetch(`${BASE_URL}/api/categories/1/driverTypes`)
        .then(r => r.json()))
  })
}

export function useFuels() {
  return useQuery(['fuels'], async () => {
    return z.array(paramsAPI)
      .parse(await fetch(`${DEV_URL}/auto/type?api_key=${API_KEY}`)
        .then(r => r.json()))
  })
}
