import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavourites, removeFavourite } from 'src/common/localstorage'
import { apiTimePeriod, searchClips } from 'src/types/search'
import './favourites.scss'

const Favourites: FC = () => {
	const [favourites, setFavourites] = useState<{ search: searchClips; rank: number }[]>([])

	const loadFavourites = useCallback(() => {
		const favouritesRes = getFavourites()

		setFavourites(favouritesRes)
	}, [])

	useEffect(() => {
		loadFavourites()
	}, [loadFavourites])

	const handleRemove = (search: searchClips) => {
		removeFavourite(search)
		loadFavourites()
	}

	return (
		<>
			{favourites && (
				<section className='favourites-container'>
					<h5 className='title-lg'>Your Favourites</h5>
					<ul className='favourites-list'>
						{favourites.map(({ search }) => (
							<li className='favourites-item' key={search.value}>
								<Link to={`/${search.mode}/${apiTimePeriod.week}/${search.value}`}>{search.value}</Link>
								<button title='remove favourite' onClick={() => handleRemove(search)}>
									X
								</button>
							</li>
						))}
					</ul>
				</section>
			)}
		</>
	)
}

export default Favourites