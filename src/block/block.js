/**
 * BLOCK: notlaura-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks, MediaUpload } = wp.editor;
const { Button } = wp.components;

/**
 * Register: Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-notlaura-blocks-story-block', {
	title: __( 'Story Block' ),
	icon: 'grid-view',
	category: 'layout', 
	keywords: [
		__( 'Story Block' ),
		__( 'Columns' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		mediaID: {
			type: 'number',
		},
		mediaAlt: {
			type: 'string',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		}
	},

	edit: function( props ) {
		const { attributes }= props;

		const onSelectImage = media => {
			console.log(media);
			
			props.setAttributes({
				mediaURL: media.sizes.medium.url,
				mediaID: media.id,
				mediaAlt: media.alt
			});
		};

		return (
			<div className={props.className + ' nl-story-2-col'}>
				<div>
					<MediaUpload
						onSelect={onSelectImage}
						type="image"
						value={attributes.mediaID}
						render={({ open }) => (
							<Button className={attributes.mediaID ? 'image-button' : 'button button-large'} onClick={open}>
								{!attributes.mediaID ? __('Upload Image') : <img src={attributes.mediaURL} />}
							</Button>
						)}
					/>
				</div>
				<div>
					<InnerBlocks />
				</div>
			</div>
		);
	},

	save: function( props ) {
		return (
			<figure className="nl-story-2-col">
				<div class="nl-story-visual">
					<img src={ props.attributes.mediaURL } alt={ props.attributes.mediaAlt } />
				</div>
				<figcaption class="nl-story-caption">
					<InnerBlocks.Content />
				</figcaption>
			</figure>
		);
	},
} );
