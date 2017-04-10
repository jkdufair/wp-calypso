/**
 * External dependencies
 */
import React from 'react';
import { pick } from 'lodash';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import ExternalLink from 'components/external-link';
import FormFieldset from 'components/forms/form-fieldset';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import FormTextarea from 'components/forms/form-textarea';
import FormLabel from 'components/forms/form-label';
import FormToggle from 'components/forms/form-toggle/compact';
import SectionHeader from 'components/section-header';
import WrapSettingsForm from './wrap-settings-form';

const AcceptedFilenames = ( {
	fields: {
		archives,
		author,
		category,
		feed,
		frontpage,
		home,
		pages,
		search,
		single,
		tag,
		wp_accepted_files,
		wp_rejected_uri,
	},
	handleAutosavingToggle,
	handleChange,
	handleSubmitForm,
	isRequesting,
	isSaving,
	translate,
} ) => {
	return (
		<div>
			<SectionHeader label={ translate( 'Accepted Filenames & Rejected URIs' ) }>
				<Button
					compact
					primary
					disabled={ isRequesting || isSaving }
					onClick={ handleSubmitForm }>
					{ isSaving
						? translate( 'Saving…' )
						: translate( 'Save Settings' )
					}
				</Button>
			</SectionHeader>
			<Card>
				<form>
					<FormLabel>
						{ translate( 'Do not cache these page types.' ) }
					</FormLabel>

					<FormSettingExplanation className="wp-super-cache__condition-settings-explaination">
						{ translate(
							' See the {{a}}Conditional Tags{{/a}} ' +
							'documentation for a complete discussion on each type.',
							{
								components: {
									a: (
										<ExternalLink
											icon={ true }
											target="_blank"
											href="http://codex.wordpress.org/Conditional_Tags"
										/>
									),
								}
							}
						) }
					</FormSettingExplanation>

					<FormFieldset>
						<FormToggle
							checked={ !! single }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'single' ) }>
							<span>
								{ translate( 'Single Posts (is_single)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! pages }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'pages' ) }>
							<span>
								{ translate( 'Pages (is_page)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! frontpage }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'frontpage' ) }>
							<span>
								{ translate( 'Front Page (is_front_page)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! home }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'home' ) }>
							<span>
								{ translate( 'Home (is_home)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! archives }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'archives' ) }>
							<span>
								{ translate( 'Archives (is_archive)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! tag }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'tag' ) }>
							<span>
								{ translate( 'Tags (is_tag)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! category }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'category' ) }>
							<span>
								{ translate( 'Category (is_category)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! feed }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'feed' ) }>
							<span>
								{ translate( 'Feeds (is_feed)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! search }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'search' ) }>
							<span>
								{ translate( 'Search Pages (is_search)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! author }
							disabled={ isRequesting || isSaving }
							onChange={ handleAutosavingToggle( 'author' ) }>
							<span>
								{ translate( 'Author Pages (is_author)' ) }
							</span>
						</FormToggle>
					</FormFieldset>

					<FormFieldset>
						<FormLabel>
							{ translate( 'Do not cache pages that contain the following strings:' ) }
						</FormLabel>
						<FormTextarea
							disabled={ isRequesting || isSaving }
							onChange={ handleChange( 'wp_rejected_uri' ) }
							value={ wp_rejected_uri || '' } />
						<FormSettingExplanation>
							{ translate(
								'Add here strings (not a filename) that forces a page not to be cached. For example, ' +
								'if your URLs include year and you dont want to cache last year posts, it’s enough ' +
								'to specify the year, i.e. ’/2004/’. WP-Cache will search if that string is part ' +
								'of the URI and if so, it will not cache that page.'
							) }
						</FormSettingExplanation>
					</FormFieldset>

					<FormFieldset>
						<FormLabel>
							{ translate( 'Whitelisted filenames:' ) }
						</FormLabel>
						<FormTextarea
							disabled={ isRequesting || isSaving }
							onChange={ handleChange( 'wp_accepted_files' ) }
							value={ wp_accepted_files || '' } />
						<FormSettingExplanation>
							{ translate(
								'Add here those filenames that can be cached, even if they match one of the rejected ' +
								'substring specified above.'
							) }
						</FormSettingExplanation>
					</FormFieldset>
				</form>
			</Card>
		</div>
	);
};

const getFormSettings = settings => {
	const textSettings = pick( settings, [
		'wp_accepted_files',
		'wp_rejected_uri',
	] );
	const wpCachePages = pick( settings.wp_cache_pages, [
		'archives',
		'author',
		'category',
		'feed',
		'frontpage',
		'home',
		'pages',
		'search',
		'single',
		'tag',
	] );

	return Object.assign( {}, textSettings, wpCachePages );
};

export default WrapSettingsForm( getFormSettings )( AcceptedFilenames );
