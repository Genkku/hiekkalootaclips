import getResponse from './service'

export const getSubreddit = async (query: string) => {
	const baseUrl = `https://old.reddit.com/r/${query}`

	const res = await getResponse(baseUrl)
	if (res) {
		console.log(res.data)
		return res.data.data
	} else {
		return false
	}
}