describe('Google Palce Factory', function () {

    var GooglePlaceSvc;

    // Before each test load our COMMON
    beforeEach(angular.mock.module(APP_MODULES.COMMON.name));

    // Before each test set our injected googlePlaceSvc factory (_GooglePlaceSvc_) to our local googlePlaceSvc variable
    beforeEach(inject(function (_GooglePlaceSvc_) {
        GooglePlaceSvc = _GooglePlaceSvc_;
    }));

    // A simple test to verify the googlePlaceSvc factory exists
    it('should exist', function () {
        expect(GooglePlaceSvc).toBeDefined();
    });

});