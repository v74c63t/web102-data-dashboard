# Web Development Project 6 - _Data Dashboard_

Submitted by: **Vanessa Tang**

This web app: **insert description**

Time spent: **X** hours spent in total

## Required Features

The following **required** functionality is completed:

-   [ ] **The app includes at least one unique chart developed using the fetched data that tell an interesting story**
-   [ ] **Clicking on an item in the list view displays more details about it**
-   [ ] **Clicking on an item has a direct, unique link to that item's detail view page**

The following **optional** features are implemented:

-   [ ] The site's customized dashboard contains more content that explains what is interesting about the data
-   [ ] The site allows users to toggle between different data visualizations

The following **additional** features are implemented:

-   [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->

GIF created with [Kap](https://getkap.co/)

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

## License

    Copyright [2024] [Vanessa Tang]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

<details>
<summary>README for Data Dashboard Part 1</summary>

# Web Development Project 5 - _Data Dashboard_

Submitted by: **Vanessa Tang**

This web app: **displays data about breweries using the [OpenBreweryDB API](https://www.openbrewerydb.org/documentation). The initial list of data displayed on the app is from the `/v1/breweries` endpoint. Users may adjust the page size to change the amount of data displayed on the page. Users may also filter the data that is currently displayed on the page by search, name, city, state, country, and type. The reset button for the filter functionality will remove all filters from the list and display the non-filtered list again. Users can fetch new data from the API if they wish too using the search functionality. They can query for breweries by name, city, state, country, and type. They can also make a broad query that will search for all fields that contain that query. The reset button will return the list of data to be the initial list of data from when the app is first loaded. There are a couple of summary statistics displayed on the top of the page. The first card displays the total amount of breweries available in the API. The second card displays the total amount of breweries found with searching the API using the query provided by the user. The third card displays the total amount of breweries on the current page that fulfill the filters that were set by the user.**

Time spent: **15** hours spent in total

## Required Features

The following **required** functionality is completed:

-   [x] **The list displays a list of data fetched using an API call**
-   [x] **Data uses the useEffect React hook and async/await syntax**
-   [x] **The app dashboard includes at least three summary statistics about the data such as**
    -   [x] _Total number of data that the API provides_
    -   [x] _Total number of results found from searching using API_
    -   [x] _Total number of results found from filtering the current page of returned search results_
-   [x] **A search bar allows the user to search for an item in the fetched data**
-   [x] **Multiple different filters (2+) allow the user to filter items in the database by specified categories**

The following **optional** features are implemented:

-   [x] Multiple filters can be applied simultaneously
-   [x] Filters use different input types such as a text input, a selection, or a slider
-   [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

-   [x] A search functionality so users can fetch more data from the API
-   [x] Page size limits

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='walkthrough1.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->

GIF created with [Kap](https://getkap.co/)

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

I spent a lot of time just trying to find a viable API to use for the app. I originally wanted to use a different API listed on the project page, but there was no way to obtain an API key for that API so I had to switch the current API I am using. I had a lot of trouble thinking of what to do for the summary statistics because there just was not enough information from the API to come up with any statistics. Ultimately, I just decided to go with what I have right now since I already made the search part because I misunderstood the instructions. Also, I originally was planning on incorporating pagination so users can see more than the first few results from the API, but it ended up causing a lot of problems so I ended up scrapping that idea.

## License

    Copyright [2024] [Vanessa Tang]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

</details>
