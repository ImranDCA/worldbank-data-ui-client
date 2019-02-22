



# Notes

## useful

 * which series apply to a source: https://api.worldbank.org/v2/sources/11/series
 * which countries apply to a source: https://api.worldbank.org/v2/sources/11/country
 * query data for 1 source, and multiple countries and series: https://api.worldbank.org/v2/sources/57/country/USA;ARG/series/ER.GDP.FWTL.M3.KD;SH.DYN.AIDS.FE.ZS/time/all/version/201404/data?mrv=7&gapfill=Y


### old
 * use mrv and gapfill to query exactly N results and with non empty values. (Doesnt work with page and per_page)
 https://api.worldbank.org/v2/sources/57/country/USA/series/ER.GDP.FWTL.M3.KD;SH.DYN.AIDS.FE.ZS/time/all/version/201404/data?mrv=7&gapfill=Y
 * if gapfill is not used then time and version are very important - you cannot query data on a date greater than the version.
 * add page and per_page params : https://api.worldbank.org/v2/sources/57/country/USA/series/ER.GDP.FWTL.M3.KD;SH.DYN.AIDS.FE.ZS/time/all/version/201404/data?page=2&per_page=20
 * to retrieve all series of all times of a country: https://api.worldbank.org/v2/sources/57/country/ALB/series/all/time/all//data
 * https://api.worldbank.org/v2/sources/57/country/USA/series/ER.GDP.FWTL.M3.KD;SH.DYN.AIDS.FE.ZS/time/all/version/201404/data


## gapfill and mrv :

MRV: Fetches most recent values based on the number specified.
Example: http://api.worldbank.org/v2/country/chn;ago/indicator/AG.AGR.TRAC.NO?mrv=5

MRNEV: For fetching most recent non-empty values based on the number specified.
Example: http://api.worldbank.org/v2/country/chn;ago/indicator/AG.AGR.TRAC.NO?mrnev=5

Gap-fill: (Y/N) Works with MRV. Fills values, if not available, by back tracking to the next available period (max number of periods back tracked will be limited by MRV number)
Example: http://api.worldbank.org/v2/en/country/ind;chn/indicator/DPANUSSPF?mrv=7&gapfill=Y

Frequency: For fetching quarterly (Q), monthly (M) or yearly (Y) values. This feature currently works along with MRV. This query string is useful for querying high frequency data.
Example: http://api.worldbank.org/v2/en/country/ind;chn/indicator/DPANUSSPF?mrv=7&frequency=M

## Countries

 * o list all countries: http://api.worldbank.org/v2/country
 * to detail a particular country: http://api.worldbank.org/v2/country/br

## indicators

Indicator API provides programmatic access to time series development data and metadata. Most of the articles in this section are devoted to the Indicators API.

Indicators represent data like total population, gross national income, energy use, and many more. They belong to one or more sources

 * To request all indicators: http://api.worldbank.org/v2/indicator

 * To request the indicator GDP (Current US$), use its indicator code, NY.GDP.MKTP.CD: http://api.worldbank.org/v2/indicator/NY.GDP.MKTP.CD

 *  To find an indicator from a specific source, the indicator’s source ID must be provided as a query parameter.For example http://api.worldbank.org/v2/indicator/NY.GDP.MKTP.CD?source=11  or http://api.worldbank.org/v2/source/11/indicator/NY.GDP.MKTP.CD


## Topics

Topics are high level categories to which all indicators are mapped. Agriculture & Rural Development, Education, and Trade are examples of topics.

 * To list all topics: http://api.worldbank.org/v2/topic

 * To list specific topics, separating multiple codes with semicolons (;):  http://api.worldbank.org/v2/topic/5 or http://api.worldbank.org/v2/topic/5;11

 * To list all indicators under a specified topic: http://api.worldbank.org/v2/topic/5/indicator or: http://api.worldbank.org/v2/indicator?topic=5


# aggregate

Aggregates—by region, income level or lending group—are also available in the API. You can retrieve data for aggregates by using the appropriate code where you would otherwise specify a country.

 * To get the definition list for all Region codes: http://api.worldbank.org/v2/region?format=xml
 * The following two examples retrieve GDP data for Brazil (BRA) and the Latin America and Caribbean region as a whole (LCN):http://api.worldbank.org/v2/country/BRA/indicator/NY.GDP.MKTP.CD
 * To get the definition list for all Region codes: http://api.worldbank.org/v2/region?format=xml
 To get the list of all Income Level code definitions:http://api.worldbank.org/v2/incomelevel

To get the list of all Lending Type code definitions:http://api.worldbank.org/v2/lendingtypes

 * Or you can retrieve a list of definitions for specific regions, income levels or lending types, separating multiple codes with semicolons (;):
http://api.worldbank.org/v2/region/LCN
http://api.worldbank.org/v2/incomelevel/UMC
http://api.worldbank.org/v2/lendingtype/IBD;IDB

 * Querying a country shows you which aggregate groups it belongs to:http://api.worldbank.org/v2/country/BRA

 * Conversely, you can apply a filter to see all countries in a specified aggregate:
http://api.worldbank.org/v2/country?region=LCN
http://api.worldbank.org/v2/country?incomelevel=UMC
http://api.worldbank.org/v2/country?lendingtype=IBD


## sources/concept/variable - metadata

provides programmatic access to time series development data and metadata. Most of the articles in this section are devoted to the Indicators API.

 * To request information about all sources: http://api.worldbank.org/v2/source
   * example of a source:  name: "Universal Health Coverage",
 * To request information about a particular source: http://api.worldbank.org/v2/source/2
 * To request a list of all available concepts in a source: http://api.worldbank.org/v2/sources/2/concepts/data
 * to retrieve a specific concept detail for a source (in this example, Concept ID is “Country” and Source is “WDI Database Archives” or source 57): http://api.worldbank.org/v2/sources/57/concepts/Country/data
 * To request a list of all available variables in a concept: http://api.worldbank.org/v2/source/2/country/data
   * example: list all countries that apply to a concept :  https://api.worldbank.org/v2/sources/58/series/data?format=json
   * example list all series that apply to a concept:  https://api.worldbank.org/v2/sources/58/series/data?format=json
  *  to retrieve a specific concept variable detail for a source (in this example, concept ID is “Country”, Country variable id is “ALB” and Source is World Development Indicators or source 2): http://api.worldbank.org/v2/sources/2/Country/ALB/data
  * to list all versions of a concept: https://api.worldbank.org/v2/sources/57/version/data
 * see which country (concept) apply to a source (11) https://api.worldbank.org/v2/sources/11/country
 * example of serie :  id: "SH.UHC.NOP1.TO" value: "Number of people pushed below the $1.90 ($ 2011 PPP) poverty line by out-of-pocket health care expenditure"
 * example of a query https://api.worldbank.org/v2/sources/58/country/FRA/series/SH.UHC.NOP1.TO;SH.UHC.OOPC.10.TO/time/YR2015;YR2016?format=json

# Languages

 * The following query returns all the languages supported by the World bank API v2: http://api.worldbank.org/v2/languages

 * list the countries in vietnamise http://api.worldbank.org/v2/vi/country/vn
