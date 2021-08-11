import { FC } from 'react'
import { MdChevronRight, MdChatBubbleOutline } from 'react-icons/md'
import twitchLogo from '../../assets/logo-twitch.svg'
import { useStateValue } from 'src/state/state'

interface Props {
	handleComments: () => void
	handleNext: () => void
	handlePrev: () => void
	prevDisabled: boolean
	nextDisabled: boolean
}

const VideoTopControls: FC<Props> = ({
	handleComments,
	handleNext,
	handlePrev,
	prevDisabled,
	nextDisabled
}) => {
	const [{ currentClip }] = useStateValue()
	return (
		<div className='video-top-controls'>
			<h4 className='title-lg'>{currentClip.title}</h4>

			<div className='right-container'>
				{currentClip.twitch_url && (
					<a
						className='link-twitch'
						href={`${currentClip.twitch_url}`}
						target='_blank'
						rel='noreferrer'
						title='clip twitch page'
					>
						<img className='' width='25' src={twitchLogo} alt='twitch logo' />
					</a>
				)}
				{currentClip.comments && (
					<button className='toggle-comments' title='toggle comments' onClick={handleComments}>
						<MdChatBubbleOutline />
					</button>
				)}

				<button className='btn-clips-control btn-left' onClick={handlePrev} disabled={prevDisabled}>
					Previous
					<i className='icon-container'>
						<MdChevronRight />
					</i>
				</button>

				<button className='btn-clips-control btn-right' onClick={handleNext} disabled={nextDisabled}>
					Next
					<i className='icon-container'>
						<MdChevronRight />
					</i>
				</button>
			</div>
		</div>
	)
}

export default VideoTopControls
