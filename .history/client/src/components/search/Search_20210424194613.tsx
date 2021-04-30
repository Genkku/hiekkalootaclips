import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAutocomplete } from 'src/common/api'
import { setSearchMode } from 'src/state/reducer'
import { useStateValue } from 'src/state/state'
import { apiTimePeriod, currentSearch, searchType } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'

const Search: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const [timePeriod, setTimePeriod] = useState<apiTimePeriod>(apiTimePeriod.all)
	const [localSearchMode, setLocalSearchMode] = useState<searchType>(searchType.channel)
	const [searchSuggestions, setSearchSuggestions] = useState<AutocompleteObj[]>([])
	const [, dispatch] = useStateValue()
	const history = useHistory()

	const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()

		try {
			const searchObj: currentSearch = {
				mode: localSearchMode,
				value: searchValue,
				timePeriod: timePeriod,
			}

			dispatch(setSearchMode(searchObj))

			history.push(`/${localSearchMode}/${searchValue}/${timePeriod}`)
		} catch (e) {
			console.error(e)
		}
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

		if (val.length > 1) {
			const autoRes: any = await getAutocomplete(val)

			setSearchSuggestions(autoRes.data)
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
					value={apiTimePeriod.day}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodDay'>Last Day</label>
				<input
					id='timePeriodWeek'
					type='radio'
					name='timePeriod'
					value={apiTimePeriod.week}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodWeek'>Last Week</label>
				<input
					id='timePeriodMonth'
					type='radio'
					name='timePeriod'
					value={apiTimePeriod.month}
					onChange={handleTimePeriodChange}
				/>
				<label htmlFor='timePeriodMonth'>Last Month</label>
				<input
					id='timePeriodYear'
					type='radio'
					name='timePeriod'
					value={apiTimePeriod.year}
					onChange={handleTimePeriodChange}
				/>

				<label htmlFor='timePeriodYear'>Last Year</label>
				<input
					id='timePeriodAll'
					type='radio'
					name='timePeriod'
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
						{searchSuggestions.map((suggestion) => (
							<li key={suggestion.login}>{suggestion.login}</li>
						))}
					</ul>
				)}
			</form>
		</>
	)
}

export default Search