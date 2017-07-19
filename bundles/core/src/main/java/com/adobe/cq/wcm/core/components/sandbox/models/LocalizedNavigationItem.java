/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2017 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

package com.adobe.cq.wcm.core.components.sandbox.models;

import java.util.List;
import java.util.Locale;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Interface for a single language switcher item, used by the {@link LanguageSwitcher} model.
 */
@ConsumerType
public interface LocalizedNavigationItem extends com.adobe.cq.wcm.core.components.sandbox.models.NavigationItem {

    /**
     * Returns the title of this {@code LocalizedNavigationItem}.
     *
     * @return the title of this language switcher item
     * @since com.adobe.cq.wcm.core.components.sandbox.models 1.3.0
     */
    default String getTitle() {
        throw new UnsupportedOperationException();
    }

    /**
     * Returns the locale of this {@code LocalizedNavigationItem}.
     *
     * @return the locale of the language switcher item
     * @since com.adobe.cq.wcm.core.components.sandbox.models 1.3.0
     */
    default Locale getLocale() {
        throw new UnsupportedOperationException();
    }

    /**
     * Returns the country of this {@code LocalizedNavigationItem}.
     *
     * @return the country of the language switcher item
     * @since com.adobe.cq.wcm.core.components.sandbox.models 1.3.0
     */
    default String getCountry() {
        throw new UnsupportedOperationException();
    }

    /**
     * Returns the language of this {@code LocalizedNavigationItem}.
     *
     * @return the language of the language switcher item
     * @since com.adobe.cq.wcm.core.components.sandbox.models 1.3.0
     */
    default String getLanguage() {
        throw new UnsupportedOperationException();
    }

}