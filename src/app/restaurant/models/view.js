
function venu(defaultData) {
    try {
        defaultData = defaultData || {};

        this.picture_url = defaultData.picture_url || 'https://www.gstatic.com/images/branding/product/1x/maps_64dp.png';
        this.title = defaultData.name || null;
        this.reviews = defaultData.reviews || null;
        this.price = defaultData.price || null;
        this.place = defaultData.vicinity || null;
        this.category = defaultData.category || null;
        this.rating = defaultData.rating || null;
        this.reference = defaultData.reference || null;

    } catch (e) {
        _displayError(e);
    }
}