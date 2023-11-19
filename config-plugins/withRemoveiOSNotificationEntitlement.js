const withEntitlementsPlist = require("@expo/config-plugins").withEntitlementsPlist;

const withRemoveiOSNotificationEntitlement = (config) => {
    return withEntitlementsPlist(config, mod => {
        // mod.modResults = {...mod.modResults, "aps-environment": undefined};
        delete mod.modResults['aps-environment'];
        return mod;
    })
}

module.exports = withRemoveiOSNotificationEntitlement;