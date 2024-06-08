import { describe, expect, it } from 'vitest'
import { getExtension, getPathWithSlash } from '../../../app/utils/file'

describe('getExtension', () => {
  ;[
    [
      '1111.jpg',
      {
        extension: 'jpg',
        fileName: '1111',
      },
    ],
    [
      '1111.2222.3333.JPG',
      {
        extension: 'JPG',
        fileName: '1111.2222.3333',
      },
    ],
    [
      '----9----.png',
      {
        extension: 'png',
        fileName: '----9----',
      },
    ] as const,
  ].forEach((data, index) => {
    it(`return extension ${index + 1}`, () => {
      expect(getExtension(data[0] as string)).toMatchObject(data[1])
    })
  })
  it('return empty data without extension', () => {
    expect(getExtension('1111')).toMatchObject({
      extension: '',
      fileName: '',
    })
  })
})

describe('getPathWithSlash', () => {
  it('return path with slash', () => {
    expect(getPathWithSlash('img')).toBe('img/')
  })
  it('return path with slash', () => {
    expect(getPathWithSlash('img/')).toBe('img/')
  })
})
