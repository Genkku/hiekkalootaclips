import { TwitchSearch } from '../models/twitch'

const twitchAutocomplete = async (query: string) => {
	const res = await TwitchSearch.find({ login: new RegExp(query) })
	return res
}

export default twitchAutocomplete