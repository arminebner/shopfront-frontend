export default function customEncodeURIComponent(str: string) {
  return encodeURIComponent(str).replace(/%3A%20/g, ': ')
}
