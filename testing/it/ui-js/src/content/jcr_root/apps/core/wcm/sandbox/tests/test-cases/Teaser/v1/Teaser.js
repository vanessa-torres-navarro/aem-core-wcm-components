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

;(function(h, $) { // eslint-disable-line no-extra-semi
/* global hobs, jQuery */
    "use strict";

    window.CQ.CoreComponentsIT.Teaser.v1 = window.CQ.CoreComponentsIT.Teaser.v1 || {};
    var c                                = window.CQ.CoreComponentsIT.commons;
    var teaser                           = window.CQ.CoreComponentsIT.Teaser.v1;
    var testImagePath                    = "/content/dam/core-components/core-comp-test-image.jpg";
    var title                            = "Teaser Title";
    var description                      = "Teaser Description";
    var pageName                         = "teaser-page";
    var pageVar                          = "teaser_page";
    var secondPageName                   = "teaser-page-second";
    var secondPageVar                    = "teaser_page_second";
    var pageDescription                  = "teaser page description";
    var ctaText1                         = "CTA Text 1";
    //var ctaLink1                         = "adobe.com";
    var ctaText2                         = "CTA Text 2";
    //var ctaLink2                         = "www.adobe.com";

    teaser.tcExecuteBeforeTest = function(tcExecuteBeforeTest, teaserRT, pageRT) {
        return new h.TestCase("Create sample content", {
            execBefore: tcExecuteBeforeTest
        })
            .execFct(function(opts, done) {
                c.createPage(c.template, c.rootPage, pageName, pageVar, done, pageRT, pageDescription);
            })
            .execFct(function(opts, done) {
                c.createPage(c.template, c.rootPage, secondPageName, secondPageVar, done, pageRT, pageDescription);
            })

        // create a proxy component
            .execFct(function(opts, done) {
                c.createProxyComponent(teaserRT, c.proxyPath_sandbox, "proxyPath", done);
            })

        // create a proxy component for an image
            .execFct(function(opts, done) {
                c.createProxyComponent(c.rtImage_v2, c.proxyPath_sandbox, "imageProxyPath", done);
            })

            .execFct(function(opts, done) {
            // we need to set property for image rendering delegation from  teaser proxy to image proxy
                var data = {};
                data.imageDelegate = h.param("imageProxyPath")(opts);
                c.editNodeProperties(h.param("proxyPath")(opts), data, done);
            })

            .execFct(function(opts, done) {
                c.addComponent(h.param("proxyPath")(opts), h.param(pageVar)(opts) + c.relParentCompPath, "cmpPath", done);
            })
            .navigateTo("/editor.html%" + pageVar + "%.html");
    };

    teaser.tcExecuteAfterTest = function(tcExecuteAfterTest, policyPath, policyAssignmentPath) {
        return new h.TestCase("Clean up after test", {
            execAfter: tcExecuteAfterTest
        })

            // delete the test proxies we created
            .execFct(function(opts, done) {
                c.deleteProxyComponent(h.param("proxyPath")(opts), done);
            })

            .execFct(function(opts, done) {
                c.deleteProxyComponent(h.param("imageProxyPath")(opts), done);
            })

            .execFct(function(opts, done) {
                c.deletePolicy("/teaser", done, policyPath);
            })
            .execFct(function(opts, done) {
                c.deletePolicyAssignment("/teaser", done, policyAssignmentPath);
            })

            .execFct(function(opts, done) {
                c.deletePage(h.param(secondPageVar)(opts), done);
            })

            .execFct(function(opts, done) {
                c.deletePage(h.param(pageVar)(opts), done);
            });
    };

    teaser.testFullyConfiguredTeaser = function(tcExecuteBeforeTest, tcExecuteAfterTest, selectors) {
        return new h.TestCase("Fully configured Teaser", {
            execBefore: tcExecuteBeforeTest,
            execAfter: tcExecuteAfterTest
        })
            .execTestCase(c.tcOpenConfigureDialog("cmpPath"))
            .execFct(function(opts, done) {
                c.openSidePanel(done);
            })
            // drag'n'drop the test image
            .cui.dragdrop(selectors.editDialog.assetDrag(testImagePath), selectors.editDialog.assetDrop)
            .fillInput(selectors.editDialog.linkURL, "%" + pageVar + "%")
            .click(selectors.editDialog.titleValueFromPage)
            .fillInput(selectors.editDialog.title, title)
            .click(selectors.editDialog.descriptionValueFromPage)
            .fillInput(selectors.editDialog.description, description)
            .execTestCase(c.tcSaveConfigureDialog)
            .assert.isTrue(function() {
                return h.find(selectors.component.image + ' img[src*="' + h.param(pageVar)() +
                    '/_jcr_content/root/responsivegrid/teaser"]', "#ContentFrame").size() === 1;
            })
            .assert.isTrue(function() {
                var selector = "a" + selectors.component.titleLink + '[href$="' + h.param(pageVar)() + '.html"]';
                return h.find(selector, "#ContentFrame").text() === title;
            })
            .assert.isTrue(function() {
                var selector = selectors.component.description;
                return h.find(selector, "#ContentFrame").html().trim() === description;
            });

    };

    teaser.testInheritedPropertiesTeaser = function(tcExecuteBeforeTest, tcExecuteAfterTest, selectors) {
        return new h.TestCase("Teaser with inherited properties", {
            execBefore: tcExecuteBeforeTest,
            execAfter: tcExecuteAfterTest
        })
            .execTestCase(c.tcOpenConfigureDialog("cmpPath"))
            .execFct(function(opts, done) {
                c.openSidePanel(done);
            })
            // drag'n'drop the test image
            .cui.dragdrop(selectors.editDialog.assetDrag(testImagePath), selectors.editDialog.assetDrop)
            .fillInput(selectors.editDialog.linkURL, "%" + pageVar + "%")
            .execTestCase(c.tcSaveConfigureDialog)
            .assert.isTrue(function() {
                return h.find(selectors.component.image + ' img[src*="' + h.param(pageVar)() +
                    '/_jcr_content/root/responsivegrid/teaser"]', "#ContentFrame").size() === 1;
            })
            .assert.isTrue(function() {
                var selector = "a" + selectors.component.titleLink + '[href$="' + h.param(pageVar)() + '.html"]';
                return h.find(selector, "#ContentFrame").text() === pageName;
            })
            .assert.isTrue(function() {
                var selector = selectors.component.description;
                return h.find(selector, "#ContentFrame").html().trim() === pageDescription;
            });

    };

    teaser.testHideElementsTeaser = function(tcExecuteBeforeTest, tcExecuteAfterTest, selectors, policyName, policyLocation, policyPath, policyAssignmentPath) {
        return new h.TestCase("Hide elements for Teaser", {
            execBefore: tcExecuteBeforeTest,
            execAfter: tcExecuteAfterTest
        })

            .execFct(function(opts, done) {
                var data = {};
                data["jcr:title"] = "New Policy";
                data["sling:resourceType"] = "wcm/core/components/policy/policy";
                data["hideTitle"] = "true";
                data["hideDescription"] = "true";

                c.createPolicy(policyName + "/new_policy", data, "policyPath", done, policyPath);
            })

            .execFct(function(opts, done) {
                var data = {};
                data["cq:policy"] = policyLocation + policyName + "/new_policy";
                data["sling:resourceType"] = "wcm/core/components/policies/mapping";

                c.assignPolicy(policyName, data, done, policyAssignmentPath);
            })
            // open the dialog
            .execTestCase(c.tcOpenConfigureDialog("cmpPath"))

            .assert.exist(selectors.component.title, false)
            .assert.exist(selectors.component.description, false);
    };

    teaser.testLinksToElementsTeaser = function(tcExecuteBeforeTest, tcExecuteAfterTest, selectors, policyName, policyLocation, policyPath, policyAssignmentPath) {
        return new h.TestCase("Links to elements for Teaser", {
            execBefore: tcExecuteBeforeTest,
            execAfter: tcExecuteAfterTest
        })

            .execFct(function(opts, done) {
                var data = {};
                data["jcr:title"] = "New Policy";
                data["sling:resourceType"] = "wcm/core/components/policy/policy";
                data["hideImageLink"] = "true";
                data["hideTitleLink"] = "true";

                c.createPolicy(policyName + "/new_policy", data, "policyPath", done, policyPath);
            })

            .execFct(function(opts, done) {
                var data = {};
                data["cq:policy"] = policyLocation + policyName + "/new_policy";
                data["sling:resourceType"] = "wcm/core/components/policies/mapping";

                c.assignPolicy(policyName, data, done, policyAssignmentPath);
            })
            // open the dialog
            .execTestCase(c.tcOpenConfigureDialog("cmpPath"))
            .execFct(function(opts, done) {
                c.openSidePanel(done);
            })

            // drag'n'drop the test image
            .cui.dragdrop(selectors.editDialog.assetDrag(testImagePath), selectors.editDialog.assetDrop)
            .fillInput(selectors.editDialog.linkURL, "%" + pageVar + "%")
            .execTestCase(c.tcSaveConfigureDialog)

            .assert.isTrue(function() {
                var selector = selectors.component.image + ' img[src*="' + h.param(pageVar)() +
                    '/_jcr_content/root/responsivegrid/teaser"]';
                return h.find(selector, "#ContentFrame").length === 1;
            })
            .assert.isTrue(function() {
                var selector = selectors.component.image + " a";
                return h.find(selector, "#ContentFrame").length === 0;
            })
            .assert.isTrue(function() {
                var selector = "a" + selectors.component.titleLink + '[href$="' + h.param(pageVar)() + '.html"]';
                return h.find(selector, "#ContentFrame").length === 0;
            });
    };

    teaser.testDisableCtaTeaser = function(tcExecuteBeforeTest, tcExecuteAfterTest, selectors, policyName, policyLocation, policyPath, policyAssignmentPath) {
        return new h.TestCase("Disable CTAs for Teaser", {
            execBefore: tcExecuteBeforeTest,
            execAfter: tcExecuteAfterTest
        })
            .execFct(function(opts, done) {
                var data = {};
                data["jcr:title"] = "New Policy";
                data["sling:resourceType"] = "wcm/core/components/policy/policy";
                data["disableCTA"] = "true";

                c.createPolicy(policyName + "/new_policy", data, "policyPath", done, policyPath);
            })

            .execFct(function(opts, done) {
                var data = {};
                data["cq:policy"] = policyLocation + policyName + "/new_policy";
                data["sling:resourceType"] = "wcm/core/components/policies/mapping";

                c.assignPolicy(policyName, data, done, policyAssignmentPath);
            })

            // open the dialog
            .execTestCase(c.tcOpenConfigureDialog("cmpPath"))
            .execFct(function(opts, done) {
                c.openSidePanel(done);
            })

            .assert.isTrue(function() {
                var selector = selectors.editDialog.withCTA;
                return h.find(selector).length === 0;
            });
    };

    teaser.testWithCtaTeaser = function(tcExecuteBeforeTest, tcExecuteAfterTest, selectors) {
        return new h.TestCase("Teaser with CTAs", {
            execBefore: tcExecuteBeforeTest,
            execAfter: tcExecuteAfterTest
        })
            // open the dialog
            .execTestCase(c.tcOpenConfigureDialog("cmpPath"))
            .execFct(function(opts, done) {
                c.openSidePanel(done);
            })

            // drag'n'drop the test image
            .cui.dragdrop(selectors.editDialog.assetDrag(testImagePath), selectors.editDialog.assetDrop)
            //.fillInput(selectors.editDialog.linkURL, "%" + pageVar + "%")
            .click(selectors.editDialog.withCTA)
            .fillInput(selectors.editDialog.ctaLinkURL, "%" + pageVar + "%")
            .fillInput(selectors.editDialog.ctaText, ctaText1)
            .click("button:contains('Add')")
            .fillInput(selectors.editDialog.ctaLinkURL + ":eq(1)", "%" + secondPageVar + "%")
            .fillInput(selectors.editDialog.ctaText + ":eq(1)", ctaText2)

            .execTestCase(c.tcSaveConfigureDialog)
            /*
            .assert.isTrue(function() {
                return h.find(selectors.component.image + ' img[src*="' + h.param(pageVar)() +
                        '/_jcr_content/root/responsivegrid/teaser"]', "#ContentFrame").size() === 1;
            })
            .assert.isTrue(function() {
                var selector = "a" + selectors.component.titleLink + '[href$="' + h.param(pageVar)() + '.html"]';
                return h.find(selector, "#ContentFrame").text() === pageName;
            })
            .assert.isTrue(function() {
                var selector = selectors.component.description;
                return h.find(selector, "#ContentFrame").html().trim() === pageDescription;
            })
             */
            .assert.isTrue(function() {
                var selector = selectors.component.ctaLink + ":contains('" + ctaText1 + "')";
                return h.find(selector, "#ContentFrame").size() === 1;
            })
            .assert.isTrue(function() {
                var selector = selectors.component.ctaLink + ":contains('" + ctaText2 + "')";
                return h.find(selector, "#ContentFrame").size() === 1;
            });
    };
}(hobs, jQuery));
