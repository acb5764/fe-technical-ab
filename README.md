Hello!

npm install && npm start 
should get you up and running.

In total, this took me ~9 hours of work/study to complete. I had to refresh on a few things. Would have liked to include Unit Tests and accessability, but I have never done Test Driven Development or added accessability features to a website. It would require I learn it now, but I fear I have already spent too much time on this. I am ready to learn, however!

Tradeoffs: The data served is terrible. To avoid rendering incomplete data, and to save the client from having to do the work of iterating through, I decided to not render an entry unless it is complete. You will also find "Dummy" data alongside it, just so theres something there when FHIR wants to dish out ~not-data~.


Sidebar was created from scratch using this as reference: https://w3collective.com/react-sidebar-navigation-component/

Table is Material-UI, using: https://material-ui.com/components/tables/

Fonts/icons are available in many packages, but I chose react-icons from: https://react-icons.github.io/react-icons/
As this package allows for future expansion of icon diversity without bloating the client.

b.well icons taken from the b.well website. favicon, and logo.

Used a component which overlays the data rather than a secondary "page" as it seemed unnecessary. Left my initial routes for future expandability. 



