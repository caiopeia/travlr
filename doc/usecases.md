# Usecases
## Solo Traveller (MVP)
* [trips](ui/trips.drawio.png): **user** oversees existing **trip**s
* [trip](ui/trip.drawio.png): **user** reads, creates or updates a **trip**
  * **user** shows an overview of all **station**s of the **trip** on a map
  * **user** shows the **photo**s per **station**
  * **user** sets a _description_
  * [station](ui/station.drawio.png): **user** reads, creates or updates a **station**
    * **user** sets _location_, _timespan_, _name_ and _description_
    * **user** sets one or more **photo**s for a **station**
      * for MVP just a simple os file selection dialog for images
      * [check for location and time if match between photo and station]
    * **user** removes a **photo**
  * **user** removes a **station**
* **user** removes **trip**

## Backlog
* tagging
  * a **station** can be tagged by multiple **tag**s `cultural`, `culinary` or `relaxing`
  * a **trip**s tags is the set of all **tag**s of all **station**
* user creates a trip from an existing trip
* user imports **photo**s (picture with metadata like location and time)
  * this is an interactively guided import process
  * for each picture and grounded by location of the picture
      * add to an existing station
      * [propose a new station]
* friends
  * user invites friends for a trip
  * user searches for friends
  * user reads travels of a friend
  * user adds a friend
