import { __ } from '@wordpress/i18n'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import {
	PanelBody,
	__experimentalNumberControl as NumberControl,
	ToggleControl
} from '@wordpress/components'
import { useSelect } from '@wordpress/data'
import parse from 'html-react-parser'

export default function Edit({ attributes, setAttributes }) {
	const {
		numberOfPosts,
		showPostAuthor,
		linkToAuthorPage,
		showPostDate,
		showPostImage
	} = attributes

	const posts = useSelect( select => {
		return select('core').getEntityRecords('postType', 'post', { per_page: numberOfPosts })
	}, [ numberOfPosts ])

	const media = useSelect( select => {
		if (!posts) {
			return []
		}

		return posts.map(post => {
			if (!post.featured_media) {
				return null
			}

			return select('core').getMedia(post.featured_media)
		})
	}, [posts])

	const authors = useSelect( select => {
		if (!posts || !showPostAuthor) {
			return []
		}

		return posts.map(post => {
			if (!post.author) {
				return null
			}

			return select('core').getUsers({ who: 'authors', include: [post.author] })
		})
	}, [posts, showPostAuthor])

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Block settings', 'post-grid-block' ) }>
					<NumberControl
						label={ __( 'Number of posts to display', 'post-grid-block' ) }
						value={ numberOfPosts }
						onChange={ ( value ) => setAttributes( { numberOfPosts: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show post image', 'post-grid-block' ) }
						checked={ showPostImage }
						onChange={ ( value ) => setAttributes( { showPostImage: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show post author', 'post-grid-block' ) }
						checked={ showPostAuthor }
						onChange={ ( value ) => setAttributes( { showPostAuthor: value } ) }
					/>
					{ showPostAuthor ? (
						<ToggleControl
							label={ __( 'Link to author page', 'post-grid-block' ) }
							checked={ linkToAuthorPage }
							onChange={ ( value ) => setAttributes( { linkToAuthorPage: value } ) }
						/>
					): null }
					<ToggleControl
						label={ __( 'Show post date', 'post-grid-block' ) }
						checked={ showPostDate }
						onChange={ ( value ) => setAttributes( { showPostDate: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<div className="grid">
					{posts && posts.map((post, index) => (
						<div key={post.id} className="grid-item">
							{showPostImage && media && media[index] ? (
								<figure>
									<img src={media[index].source_url} alt={media[index].alt_text} />
								</figure>
							): null}
							<div>
								<h3>{parse(post.title.rendered)}</h3>
								{showPostAuthor || showPostDate ? (
									<div className="post-meta">
										{showPostAuthor && authors && authors[index] ? (
											<small>{__('By', 'post-grid-block')} {linkToAuthorPage ? (
												<a href={authors[index][0].link}>{authors[index][0].name}</a>
											) : (
												<span>{authors[index][0].name}</span>
											)}</small>
										): null}
										{showPostDate ? (
											<small>{new Date(post.date).getFullYear()}-{String(new Date(post.date).getMonth() + 1).padStart(2, '0')}-{String(new Date(post.date).getDate()).padStart(2, '0')}</small>
										): null}
									</div>
								): null}
								<div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
								<a href={post.link}>{__('Read more', 'post-grid-block')}</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
