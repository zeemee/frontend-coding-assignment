# Frontend Developer Coding Assignment

### Purpose

The purpose of this exercise is to give us an example of your work within bounds, guildelines and specifications suppled to you. It provides us some insight into how you work, how you think, and how you build things. It also provides the opportunity for multiple discussion points during an interview. Hopefully this is also fun!

### The Ask

We would like you to build a React app that consumes a public API. The public API consists of two endpoints:

* A pageable endpoint that allows for searching
* An endpoint that accepts an id, and provides details on a specific object

The React app should match as closely as possible the design found in this [Figma](https://www.figma.com/design/au6L5XqQ0VjanC9dlgdlmI/Dev-Homework?node-id=2532-2&m=dev&t=xoqFPCWRT0d9yNZp-1). If you want access to pixel perfect measurements, you'll need to log into Figma with an account you create or already have.

### Requirements

* Clone this repo as a starting point for the assignment. It was created using [Vite](https://vite.dev/guide/) and has been configured with [Typescript](https://www.typescriptlang.org/) and [TailwindCSS](https://tailwindcss.com/).
* You can build this with any node modules or services you see fit.
* We have included the [Vitest](https://vitest.dev/guide/) test framework for your convenience and expect to see tests that exercise the behavior of the code you write.
* We have included the assets for the Figma design in the `src/assets` folder.
* To run the public API locally, follow the instructions in this [repository](https://github.com/zeemee/zeemee-public-api).

### Public API Specification

The search endpoint is defined as follows:

`GET https://zeemee-public-api-661c74e270ac.herokuapp.com/api/search?index=<number>&limit=<number>&query=<string>`

Parameters:

**index**: A numerical index that represents the offset to start returning results from. Default 0.

**limit**: A numerical limit on results to return. Default 6.

**query**: A string to query for results. This searches the **name** of a cocktail recipe inclusively, as in, 'rita' finds 'Margarita'. An empty query string returns an array of unfiltered results.

The response format looks like this:

```
{
  "drinks":
    [
      {
        "id": 1234,
        "name": "Aztec Punch",
        "category": "Punch Party Drink",
        "image": "https://www.thecocktaildb.com/images/media/drink/uqwuyp1454514591.jpg"
      },
      ...
   ],
   "totalCount": 1234
}
```

The details endpoint is defined as follows:

`GET https://zeemee-public-api-661c74e270ac.herokuapp.com/api/detail?id=<number>`

Parameters:

**id**: This should be an identifier of a cocktail recipe record.

The response format looks like this:

```
{
  "drinks":
    [
      {
        "id": 1234,
        "name": "Aztec Punch",
        "category": "Punch Party Drink",
        "container": "Punch bowl",
        "instructions": "Mix all ingredients in a pitcher. Mix thoroughly and pour into whatever is available, the bigger the better! This drink packs a big punch, so don't over do it.",
        "image": "https://www.thecocktaildb.com/images/media/drink/uqwuyp1454514591.jpg",
        "ingredients" : [
          {
            "name" : "Lemonade",
            "measurement": "1 can"
          },
          ...
        ]
      }
   ]
}
```

### Credits

For your information, the data returned by the public API is based on the data provided by [The Cocktail DB](https://www.thecocktaildb.com), because why can't work be fun? :)

### Submission

We're flexible in how you submit your work. If you want to .zip it up and email it, that's fine, if you want to create a private github account and submit a link to a repo, that's fine too.

### Thoughts and Notes

This is just an exercise. While the methods and approaches you take to problems should be indicative of how you would approach a problem in a production environment, we don't expect any over-the-top work here. Don't spend tons of time on it. If you think something really needs a complex solution that would take a lot of work, implement a lesser solution, write a note in comments about a proper solution, and we can discuss it.
