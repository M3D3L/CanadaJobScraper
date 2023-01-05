const removeTabsAndNewLines = (str) => str
.replace(/(\t|\n|Location)/g, '')
.replace(/(^\s*)/g, '')
.replace(/(Salary:)/g, '')
.replace(/(to be negotiated)/g, '')
.replace(/(\(|\))/g, '')
//replace BC with British Columbia
.replace(/(BC)/g, 'British Columbia')
//replace ON with Ontario
.replace(/(ON)/g, 'Ontario')
//replace QC with Quebec
.replace(/(QC)/g, 'Quebec')
//replace SK with Saskatchewan
.replace(/(SK)/g, 'Saskatchewan')
//replace AB with Alberta
.replace(/(AB)/g, 'Alberta')
//replace MB with Manitoba
.replace(/(MB)/g, 'Manitoba')
//replace NB with New Brunswick
.replace(/(NB)/g, 'New Brunswick')
//replace NL with Newfoundland and Labrador
.replace(/(NL)/g, 'Newfoundland and Labrador')
//replace NS with Nova Scotia
.replace(/(NS)/g, 'Nova Scotia')
//replace PE with Prince Edward Island
.replace(/(PE)/g, 'Prince Edward Island')
//replace NT with Northwest Territories
.replace(/(NT)/g, 'Northwest Territories')
//replace NU with Nunavut
.replace(/(NU)/g, 'Nunavut')
//replace YT with Yukon
.replace(/(YT)/g, 'Yukon')

export const cleanData = (data) => {

    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        for (let key in item) {
            item[key] = removeTabsAndNewLines(item[key]);
        }
    }

    return data;
}