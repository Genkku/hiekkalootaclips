import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getSuggestions } from 'src/common/api'
import { apiTimePeriod, currentSearch, searchType } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'

const Search: React.FC = () => {
	const params = useParams<currentSearch>()
	const [searchValue, setSearchValue] = useState('')
	const [timePeriod, setTimePeriod] = useState<apiTimePeriod>(apiTimePeriod.week)
	const [localSearchMode, setLocalSearchMode] = useState<searchType>(searchType.channel)
	const [searchSuggestions, setSearchSuggestions] = useState<AutocompleteObj[]>([])
	const history = useHistory()

	const getDefaultSuggestions = useCallback(async () => {
		const suggestions: any = await getSuggestions(localSearchMode)

		setSearchSuggestions(suggestions.data)
	}, [localSearchMode])

	useEffect(() => {
		if (params.searchValue) {
			setSearchValue(params.searchValue)
			setTimePeriod(params.searchTimePeriod)
			setLocalSearchMode(params.searchMode)
		}

		getDefaultSuggestions()
	}, [getDefaultSuggestions, params])

	const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		history.push(`/${localSearchMode}/${searchValue}/${timePeriod}`)
	}

	const handleSearchTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const val = e.currentTarget.value as searchType

		setLocalSearchMode(val)
	}

	const handleTimePeriodChange = (e: React.FormEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value as apiTimePeriod

		setTimePeriod(val)
	}

	const handleSearchChange = async (e: React.FormEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value
		setSearchValue(val)

		if (val.length > 0) {
			const autoRes: any = await getSuggestions(localSearchMode, val)

			setSearchSuggestions(autoRes.data)
		} else {
			getDefaultSuggestions()
		}
	}

	return (
		<>
			<form>
				<select value={localSearchMode} name='search-type' onChange={handleSearchTypeChange}>
					<option value={searchType.channel}>Channel</option>
					<option value={searchType.category}>Category/Game</option>
				</select>
				<input
					id='timePeriodDay'
					type='radio'
					name='timePeriod'
					checked={timePeriod === apiTimePeriod.day}
					value={apiTimePeriod.day}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodDay'>Last Day</label>
				<input
					id='timePeriodWeek'
					type='radio'
					name='timePeriod'
					checked={timePeriod === apiTimePeriod.week}
					value={apiTimePeriod.week}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodWeek'>Last Week</label>
				<input
					id='timePeriodMonth'
					type='radio'
					name='timePeriod'
					checked={timePeriod === apiTimePeriod.month}
					value={apiTimePeriod.month}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodMonth'>Last Month</label>
				<input
					id='timePeriodYear'
					type='radio'
					name='timePeriod'
					checked={timePeriod === apiTimePeriod.year}
					value={apiTimePeriod.year}
					onChange={handleTimePeriodChange}
				/>

				<label htmlFor='timePeriodYear'>Last Year</label>
				<input
					id='timePeriodAll'
					type='radio'
					name='timePeriod'
					checked={timePeriod === apiTimePeriod.all}
					value={apiTimePeriod.all}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodAll'>All Time</label>
				<br />
				<input type='text' placeholder='Search...' value={searchValue} onChange={handleSearchChange} />
				<button type='submit' onClick={formSubmit}>
					Submit
				</button>

				{searchSuggestions.length > 0 && (
					<ul>
						{localSearchMode === searchType.channel && (
							<>
								{searchSuggestions.map((suggestion) => (
									<li key={suggestion.login}>
										<Link
											onClick={() => setSearchSuggestions([])}
											to={`/${searchType.channel}/${suggestion.login}/${timePeriod}`}
										>
											{suggestion.login}
										</Link>
									</li>
								))}
							</>
						)}

						{localSearchMode === searchType.category && (
							<>
								{searchSuggestions.map((suggestion) => (
									<li key={suggestion.id}>
										<Link
											onClick={() => setSearchSuggestions([])}
											to={`/${searchType.category}/${suggestion.name}/${timePeriod}`}
										>
											{suggestion.name}
										</Link>
									</li>
								))}
							</>
						)}
					</ul>
				)}
			</form>
		</>
	)
}

export default Search