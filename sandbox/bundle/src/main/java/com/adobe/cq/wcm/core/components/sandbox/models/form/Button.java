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
package com.adobe.cq.wcm.core.components.sandbox.models.form;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Defines the {@code Button} Sling Model used for the {@code /apps/core/wcm/components/button} component.
 */
@ConsumerType
public interface Button extends Field {

    /**
     * Defines button type.
     */
    enum Type {
        /**
         * Button type used to submit forms.
         */
        SUBMIT("submit"),
        /**
         * Normal button.
         */
        BUTTON("button");

        private String value;

        Type(String value) {
            this.value = value;
        }

        public static Type fromString(String value) {
            for (Type type : values()) {
                if (type.value.equals(value)) {
                    return type;
                }
            }
            return SUBMIT;
        }
    }

    /**
     * @return the type of the button.
     * <p>
     * Possible values: 'button', 'submit'
     * </p>
     */
    Type getType();

}