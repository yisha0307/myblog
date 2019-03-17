module.exports = {
    lastModifiedPlugin: (schema, options) => {
        schema.add({updated_at: Date})
        schema.pre('findOne', function (next) {
            this.updated_at = new Date()
            console.log(this)
            next()
        })
        if (options && options.index) {
            schema.path('updated_at').index(options.index)
        }
    }
}