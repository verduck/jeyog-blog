import axios from 'axios'
import { getSession } from 'next-auth/react'

const BASEURL = process.env.NEXT_PUBLIC_API_URL

const getBasePrivateHeaders = async () => {
    const session = await getSession()
    return {
      Accept: `*/*`,
      'Content-Type': `application/json`,
      Authorization: `Bearer ${session?.access_token}`,
    }
  }
  
  const getBasePrivateMultipartHeaders = async () => {
    const session = await getSession()
    return {
      Accept: `*/*`,
      'Content-Type': `multipart/form-data`,
      Authorization: `Bearer ${session?.access_token}`,
    }
  }
  

const basePublicHeaders = {
    Accpept: `*/*`,
    'Content-Type': `application/json`
}

const basePublicMultipartHeaders = {
    Accpet: `*/*`,
    'Content-Type': `multipart/form-data`
}

interface Request {
    url: string
    headers?: object
    isPrivate: boolean
    method: 'get' | 'post' | 'put' | 'delete' | 'patch'
}

interface RequestWithParams extends Request {
    params?: object
}

interface RequestWithData extends Request {
    params?: object
    data?: object
    type?: 'multipart' | 'json'
}

const sendRequest = async ({
    url,
    params,
    method,
    headers,
    isPrivate,
}: RequestWithParams) => {
    const baseHeaders = isPrivate
      ? await getBasePrivateHeaders()
      : basePublicHeaders
    const response = await axios[method](BASEURL + url, {
      headers: { ...baseHeaders, ...headers },
      params,
      withCredentials: true,
    })
    return { ...response, axiosStatus: response.status }
}

const sendRequestForData = async ({
    url,
    params,
    data,
    method,
    headers,
    isPrivate,
    type,
}: RequestWithData) => {
    const baseHeaders = isPrivate
      ? type === 'json'
        ? await getBasePrivateHeaders()
        : await getBasePrivateMultipartHeaders()
      : type === 'json'
      ? basePublicHeaders
      : basePublicMultipartHeaders
    const response = await axios[method](BASEURL + url, data, {
      headers: { ...baseHeaders, ...headers },
      params,
      withCredentials: true,
    })
    return { ...response, axiosStatus: response.status }
}

// get,delete 에 data(body)를 끼워넣고 싶을때 사용
const sendInsertForData = async ({
    url,
    params,
    data,
    headers,
    method,
    isPrivate,
    type,
}: RequestWithData) => {
    const baseHeaders = isPrivate
      ? type === 'json'
        ? await getBasePrivateHeaders()
        : await getBasePrivateMultipartHeaders()
      : type === 'json'
      ? basePublicHeaders
      : basePublicMultipartHeaders
    const response = await axios[method](BASEURL + url, {
      headers: { ...baseHeaders, ...headers },
      data,
      params,
      withCredentials: true,
    })
    return { ...response, axiosStatus: response.status }
}

export const privateAPI = {
    get: ({
        url,
        params,
        headers,
    }: Omit<RequestWithParams, 'isPrivate' | 'method'>) =>
        sendRequest({ url, params, method: 'get', headers, isPrivate: true }),
    post: ({
        url,
        data,
        headers,
        type,
        params,
    }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
        sendRequestForData({
            url,
            data,
            params,
            method: 'post',
            headers,
            isPrivate: true,
            type: type ?? 'json',
        }),
    put: ({
        url,
        data,
        params,
        headers,
        type,
    }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
        sendRequestForData({
            url,
            data,
            params,
            method: 'put',
            headers,
            isPrivate: true,
            type: type ?? 'json',
        }),
    delete: ({
        url,
        data,
        params,
        headers,
        type,
    }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
        sendInsertForData({
            url,
            params,
            data,
            method: 'delete',
            headers,
            isPrivate: true,
            type: type ?? 'json',
        }),
    patch: ({
        url,
        data,
        params,
        headers,
        type,
    }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
        sendRequestForData({
            url,
            data,
            params,
            method: 'patch',
            headers,
            isPrivate: true,
            type: type ?? 'json',
        }),
}

export const publicAPI = {
    get: ({
        url,
        params,
        headers,
    }: Omit<RequestWithParams, 'isPrivate' | 'method'>) =>
        sendRequest({ url, params, method: 'get', headers, isPrivate: false }),
    post: ({
        url,
        data,
        params,
        headers,
        type,
    }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
        sendRequestForData({
            url,
            data,
            params,
            method: 'post',
            headers,
            isPrivate: false,
            type: type ?? 'json',
        }),
    put: ({
        url,
        data,
        params,
        headers,
        type,
    }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
        sendRequestForData({
            url,
            data,
            params,
            method: 'put',
            headers,
            isPrivate: false,
            type: type ?? 'json',
        }),
    delete: ({
        url,
        data,
        params,
        headers,
        type,
    }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
        sendInsertForData({
            url,
            params,
            data,
            method: 'delete',
            headers,
            isPrivate: false,
            type: type ?? 'json',
        }),
    patch: ({
        url,
        data,
        params,
        headers,
        type,
    }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
        sendRequestForData({
            url,
            data,
            params,
            method: 'patch',
            headers,
            isPrivate: false,
            type: type ?? 'json',
      }),
}
  