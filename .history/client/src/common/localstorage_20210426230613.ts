export const getFavourites = () => {}

export const addFavourite = (channel: string) => {
	const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
	const itemIndex = storedFavourites.find((i: { login: string }) => i.login === channel)
	let newFavourites

	if (itemIndex) {
		newFavourites = storedFavourites
		console.log(itemIndex)

		newFavourites[itemIndex].rank = newFavourites[itemIndex].rank + 1
	} else {
		newFavourites = storedFavourites.concat({ login: channel, rank: 0 })
	}
	localStorage.setItem('favourites', JSON.stringify(newFavourites))
}