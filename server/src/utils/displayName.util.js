exports.create = (userName, display) => {
    if (!userName.length) {
        return display + '0001';
    }
    let name = userName[0].display;
    let number = name.match(/\d+/g);
    let endNumber = parseInt(number) + 1;
    if (endNumber < 10) {
        return display + '000' + endNumber;
    } else if (endNumber < 100) {
        return display + '00' + endNumber;
    } else if (endNumber < 1000) {
        return display + '0' + endNumber;
    } else {
        return display + endNumber;
    }
};

