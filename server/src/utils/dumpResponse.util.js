exports.ok = (res, msg, data) => {
    let success = true;
    if (!data || _.isEmpty(data)) {
        success = false;
        msg = messages.dataNotFound
    }
    if (data && data.length <= 0) {
        // not data return success false
        success = false;
        msg = messages.dataNotFound
    }
    res.json(data);
};
