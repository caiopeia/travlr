# Usecases
## Solo Traveller (MVP)
* ([trip overview](ui/trip_overview.drawio.png)): user oversees existing trips
* ([trip details](ui/trip_details.drawio.png)): user sees details for an existing trip
  * user shows an overview of all stations of the trip on a map
  * user shows the **photo**s per **station**
* ([trip details](ui/trip_details.drawio.png)): **user** creates a new **trip**
  * user sets a description
  * user adds a station with location, timespan and name
  * user removes a station
  * user adds one or more photos for a station
    * check for location and time if match between photo and station
  * user removes a photo
* **user** updates an existing **trip**
* **user** removes an existing **trip**

## Backlog
* user creates a trip from an existing trip
* user imports **photo**s (picture with metadata like location and time)
* friends
  * user invites friends for a trip
  * user searches for friends
  * user reads travels of a friend
  * user adds a friend
