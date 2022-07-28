
export const fetchBenches = (filters) => {
    let sendData = {filters:filters}
    return $.ajax({
        url: `api/benches`,
        method: 'GET',
        data: sendData,
        dataType: 'json'
    })
}

export const createBench = (bench) => {
    // let sendData = {bench:bench}
    return $.ajax({
        url: 'api/benches',
        method: "POST",
        data: bench,
        contentType: false,
        processData: false

    })
}