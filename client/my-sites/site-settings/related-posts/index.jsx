/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import FormFieldset from 'components/forms/form-fieldset';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import CompactFormToggle from 'components/forms/form-toggle/compact';
import SupportInfo from 'components/support-info';
import RelatedContentPreview from './related-content-preview';
import SettingsSectionHeader from 'my-sites/site-settings/settings-section-header';

/**
 * Style dependencies
 */
import './style.scss';

const RelatedPosts = ( {
	fields,
	handleAutosavingToggle,
	isRequestingSettings,
	isSavingSettings,
	translate,
} ) => {
	return (
		<div>
			<SettingsSectionHeader title={ translate( 'Related Posts' ) } />

			<Card className="related-posts__card site-settings__traffic-settings">
				<FormFieldset>
					<SupportInfo
						text={ translate(
							'Automatically displays similar content (related posts) at the end of each post.'
						) }
						link="https://jetpack.com/support/related-posts/"
					/>

					<CompactFormToggle
						checked={ !! fields.jetpack_relatedposts_enabled }
						disabled={ isRequestingSettings || isSavingSettings }
						onChange={ handleAutosavingToggle( 'jetpack_relatedposts_enabled' ) }
					>
						{ translate( 'Show related content after posts' ) }
					</CompactFormToggle>

					<div className="related-posts__module-settings site-settings__child-settings">
						<CompactFormToggle
							checked={ !! fields.jetpack_relatedposts_show_headline }
							disabled={
								isRequestingSettings || isSavingSettings || ! fields.jetpack_relatedposts_enabled
							}
							onChange={ handleAutosavingToggle( 'jetpack_relatedposts_show_headline' ) }
						>
							{ translate(
								'Show a "Related" header to more clearly separate the related section from posts'
							) }
						</CompactFormToggle>

						<CompactFormToggle
							checked={ !! fields.jetpack_relatedposts_show_thumbnails }
							disabled={
								isRequestingSettings || isSavingSettings || ! fields.jetpack_relatedposts_enabled
							}
							onChange={ handleAutosavingToggle( 'jetpack_relatedposts_show_thumbnails' ) }
						>
							{ translate( 'Show a thumbnail image where available' ) }
						</CompactFormToggle>
					</div>
					
					<FormSettingExplanation> 
						{ translate( 
							"These settings won't apply to related posts added using the block editor."
						) }
					</FormSettingExplanation>
	
					<RelatedContentPreview
						showHeadline={ fields.jetpack_relatedposts_show_headline }
						showThumbnails={ fields.jetpack_relatedposts_show_thumbnails }
					/>
				</FormFieldset>
			</Card>
		</div>
	);
};

RelatedPosts.defaultProps = {
	isSavingSettings: false,
	isRequestingSettings: true,
	fields: {},
};

RelatedPosts.propTypes = {
	onSubmitForm: PropTypes.func.isRequired,
	handleAutosavingToggle: PropTypes.func.isRequired,
	isSavingSettings: PropTypes.bool,
	isRequestingSettings: PropTypes.bool,
	fields: PropTypes.object,
};

export default localize( RelatedPosts );
