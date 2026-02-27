export function parseSiteData(data: any): any[] {
    if (data.value && data.value.timeSeries) {
        const timeSeries = data.value.timeSeries;
        const parsedData = timeSeries.map((series: any) => {
            const variableName = series.variable.variableName;
            const values = series.values[0].value.map((entry: any, index: number) => ({
                dateTime: entry.dateTime,
                y: parseFloat(entry.value),
            }));

            let values_1 = [];
            if (series.values[1]) {
                values_1 = series.values[1].value.map((entry: any) => ({
                    dateTime: entry.dateTime,
                    y: parseFloat(entry.value),
                }));
            }

            return {
                variableName,
                values: values.length > values_1.length ? values : values_1,
            };
        });

        return parsedData;
    }

    return [];
}
