/**
 * save notification screen
 *
 */
Ext.define('Ext.ib.notify.Save', {
    extend:'Ext.ib.notify.Base',
    alias:'widget.savenotify',
    title:'save',
    /**
     * @cfg {String} [idField=id] the field the id for the record can be found in
     */
    idField:'id',
    /**
     * @cgf {String} [titleField=title] The field the title can be found in
     */
    titleField:'title',

    initComponent:function () {
        var me = this;

        var msg = '';
        if (Ext.isEmpty(me.html)) {

            msg = this.getTitle() + '(' + this.getRecId() + ')<br>' + this.translate('was_saved');
            if (Ext.isDefined(me.response.resultSet)) {
                var resultSet = me.response.resultSet;
                if (resultSet.count > 1) {
                    msg = resultSet.count + ' ' + this.translate('records') + '<br>' + this.translate('where_saved');
                }
            }

            me.html = msg;
        }

        this.callParent(arguments);
    },

    getTitle:function () {
        var title = 'unknown';
        if (Ext.isDefined(this.response.resultSet) &&
            !Ext.isEmpty(this.response.resultSet.records[0].get(this.titleField))) {
            title = this.response.resultSet.records[0].get(this.titleField);
        } else if (Ext.isDefined(this.record) &&
            !Ext.isEmpty(this.record.get(this.titleField))) {
            title = this.record.get(this.titleField);
        }

        return title;
    },

    getRecId:function () {
        var id = 'unknown';
        if (Ext.isDefined(this.response.resultSet) &&
            !Ext.isEmpty(this.response.resultSet.records[0].get(this.idField))) {
            id = this.response.resultSet.records[0].get(this.idField);
        } else if (Ext.isDefined(this.record) &&
            !Ext.isEmpty(this.record.get(this.idField))) {
            id = this.record.get(this.idField);
        }

        return id;
    }
});