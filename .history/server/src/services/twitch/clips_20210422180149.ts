import { TwitchCategory, TwitchChannel, TwitchToken, apiTimePeriod } from '../../types/twitch'
import getResponse from './service'

const getClips = async (
	token: TwitchToken,
	channel?: TwitchChannel,
	category?: TwitchCategory,
	timePeriod?: apiTimePeriod,
	after?: string
) => {
	let searchType = `broadcaster_id=${channel?.id}`
	if (category) searchType = `game_id=${category?.id}`

	const baseUrl = `https://api.twitch.tv/helix/clips?${searchType}&first=5${after}`

	console.log(baseUrl)

	const res = await getResponse(token, baseUrl)

	if (res) {
		return res.data
	} else {
		return false
	}
}

export default getClips
