tau.mashups
    .addDependency('Underscore')
    .addDependency('tau/configurator')
    .addMashup(function(_, configurator) {

        'use strict';

        var templates = {
            'QA Request':
                '<div>' +
                    '<table border="1" cellpadding="1" cellspacing="1" style="width: 750px ; margin-left: auto ; margin-right: auto">' +
                        '<thead>' +
                            '<tr>' +
    			                '<th scope="col" style="text-align: right">Required Info</th>' +
    			                '<th scope="col">Value</th>' +
    			                '<th scope="col">Example Values</th>' +
    			            '</tr>' +
    			        '</thead>' +
    			        '<tbody>' +
    			            '<tr>' +
                    			'<td style="text-align: right">System</td>' +
                    			'<td style="text-align: center">...</td>' +
                    			'<td style="text-align: center">demo, systemd, uat-a</td>' +
                			'</tr>' +
                			'<tr>' +
                    			'<td style="text-align: right">Chamber Domain Key</td>' +
                    			'<td style="text-align: center">...</td>' +
                    			'<td style="text-align: center">RL, BUPA.OH, HCA</td>' +
    			            '</tr>' +
    			        '</tbody>' +
    			    '</table>' +
                '</div>' +
                '<hr />' +
    			'<div>' +
        			'<div><strong>Issue Description:</strong> ...</div>' +
        			'<hr />' +
        			'<div><span style="color: #696969">NOTE #1: Have you asked within your team if the issue can be resolved through configuration or whether the functionality is by design before raising this card?</span></div>' +
        			'<div><span style="color: #696969">NOTE #2: Have you searched targetprocess and the knowledge base for an answer before raising this card?</span></div>' +
        			'<div><span style="color: #696969">NOTE #3: If the issue is being escalated from a support ticket, don&#39;t forget to populate the Support Ticket ID field (Custom Fields section) with the ticket&#39;s ID.</span></div>' +
        			'<div><span style="color: #696969">NOTE #4: Don&#39;t attach GIFs, attach MP4-encoded videos instead.</span></div>' +
        			'<div><span style="color: #696969">NOTE #5: Don&#39;t paste large screenshots in comments, instead attach them as files.</span></div>' +
        			'<div><span style="color: #696969">NOTE #6: If there are any patient/company/invoice/etc. IDs that are relevant to the issue, don&#39;t forget to add them to the description.</span></div>' +
        			'<div>&nbsp;</div>' +
        			'<div style="text-align: center"><span style="color: #696969"><strong>PLEASE DELETE THESE NOTES FROM THE FINAL CARD DESCRIPTION, AFTER YOU&#39;VE READ THEM</strong></span></div>' +
    			'</div>',
            'Request': 'null'
        };

        var reg = configurator.getBusRegistry();

        function addBusListeners(busName, events) {
            var scope = {};

            reg.on('create', function(e, data) {
                var bus = data.bus;
                if (bus.name === busName) {
                    _.each(events, function(listener, eventName) {
                        bus.once(eventName, listener, scope);
                    });
                }
            });

            reg.on('destroy', function(e, data) {
                var bus = data.bus;
                if (bus.name === busName) {
                    bus.removeAllListeners(scope);
                }
            });
        }

        function findTemplate(entityTypeName) {
            return _.find(templates, function(v, k) {
                return k.toLowerCase() === entityTypeName;
            });
        }

        function getTemplate(context) {
            var entityTypeName = context.entity.entityType.name.toLowerCase();
            var term = _.find(context.getTerms(), function(v) {
                return (v.wordKey || v.name).toLowerCase().replace(' ', '') === entityTypeName;
            });
            var template = term ? findTemplate(term.value.toLowerCase()) : null;
            return template || findTemplate(entityTypeName);
        }

        addBusListeners('description', {
            'afterRender': function(e, renderData) {
                var value = renderData.data.value;
                if (value) {
                    return;
                }

                var template = getTemplate(renderData.view.config.context);
                if (!template) {
                    return;
                }

                var $description = renderData.element.find('.ui-description__inner');
                if ($description.length) {
                    $description.attr('data-placeholder', '');
                    $description.append('<div>' + template + '</div>');
                }
            },

            'afterRender:last + $editor.ready': function(e, renderData, $editor) {
                var value = renderData.data.rawDescription;
                if (value) {
                    return;
                }

                var template = getTemplate(renderData.view.config.context);
                if (!template) {
                    return;
                }

                if ($editor.richeditorMarkdown('instance')) {
                    $editor.richeditorMarkdown('setText', template);
                }
            }
        });
    });
