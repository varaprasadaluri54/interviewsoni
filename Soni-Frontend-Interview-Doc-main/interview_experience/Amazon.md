#Amazon Interview Experience

**Assessment Round**
```
8 MCQs
Machine coding - Build a carousel
```

**Managerial Rounds 1 and 2**
```
These rounds mainly focused on past projects, leadership principles, and ownership.
```

**Machine Coding Round 3**
```
Task: Build a file explorer
Follow-up: The directory might contain files with different extensions (e.g., XML, JSON) or nested directories up to n levels of hierarchy.
Questions:

Find all files with an XML extension.
Find all files with a size greater than 5 MB.
If I want files with an XML extension and a size greater than 5 MB, how will you make your function reusable?
Additional questions were based on principles.
```

**Technical Onsite Round 4**
```
Display all images in a UI with filtering based on dynamic tags. Clicking on any image should open a modal displaying the image title, the image itself, and the date in MM/DD/YY format.

APIs:

allImagesApi:
[
  { "link": "imageURL1", "id": 1, "title": "image1", "tags": ["nature", "bird"] },
  { "link": "imageURL2", "id": 2, "title": "image2", "tags": ["nature"] }
]
ImageByIdAPI:
{ "id": 1, "title": "image1", "toTake": "Date format", "content": "blabla" }

Follow-ups:
Display all tags as checkboxes. If multiple tags are selected, images should be filtered accordingly.
How would you handle event delegation (e.g., on each image vs. the parent container)?
What is the box model and semantic elements?
```

**Technical Onsite Round 5**
```
This was a High-Level Design (HLD) round with an interviewer who had 6+ years of experience.

Question:
Design a newspaper application.

Follow-ups:

How will you ensure the user is authenticated?
How will you address performance-related issues?
If there is any hot news, how will the client-side interact with the server-side?
How will you display related articles?
How will data flow from the frontend to the backend? Create interfaces for each API.
Outcome:
I created some HLD diagrams using the provided tool, but received average feedback for this round. It went moderately well.
```

