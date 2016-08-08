# Minimum Graph Traversal Cost

Compute the minimum cost of traversing a graph with dynamically changing weights.

## Introduction

We all know what a weighted graph is and how to compute the shortest path between two nodes. This algorithm is NOT of my invention (I'd be genius which I'm not) but the solution to the Tier 1 Google Code Jam question back in 2008.

I didn't pass that test and have no affiliation with Google whatsoever, but I reviewed the conceptual solution and memorized it forever in my mind.

This JS implementation is easily adapted to any language. The real problem here is comprehension of what actual the algorithm does.

# Definition

You have a **complete undirected graph with non-negative dynamic weights**. Two nodes are identified as the source node `S` and the destination node `D`. The weights on the edges specify the cost to traverse the edge in steps (CPU clocks, milliseconds or years isn't actually relevant).

The algorithm starts at time 0 on node `S` and has the task to compute the minimum time (cost) to reach node `D`. The traversal of an edge requires the time specified by its weight.

This is a very simple example:

```
Time 0:
S --7--> D
^

Time 1:
S --*--> D
  ^

(time 2-5 omitted)

Time 6:
S --*--> D
       ^

Time 7:
S --*--> D
         ^
```

For every step, all weights may vary. By the time node `D` is reached, the weight of the example edge has changed 7 times.

Weights may vary from a minimum of `1` to a fixed maximum value which is defined by the input data itself (see below for details), effectively severing the edge (e.G. a weight of 1000 would mean you'll never get there if you have at most 80 steps at your disposal). This way also non-complete graphs are solved.

It is possible to stay on a node as many steps as desired. This approach means that instead of traversing immediately an edge, it is possible to wait for the weight to drop.

This is an example of a smarter solution that waits 2 rounds until the weight drops:

```
Time 0:
S --7--> D
^

Time 1:
S -22--> D
^

Time 2:
S --1--> D
^

Time 3:
S -18--> D
         ^
```

## Considerations

> The algorithm does not compute the *shortest path* from `S` to `D`. Only the *minimum cost* (time) is computed!

An additional algorithm may use the *minimum cost* to actually find the *shortest path* by pruning solution space as soon as the evaluated path exceed that *minimum cost*.

This algorithm computes the *minimum cost* in `O(n^2 * t)`, where `n` is the number of nodes and `t` the number of steps about which data is available.

> Note: applying naively static-weight algorithms is futile. The dynamic-weight version of the *shortest path problem* is forbiddingly more complex.

## Input

The graph is complete, so the only information that defines it is the weights of each edge for each step. A table of weights will have `n * n` columns and `t` rows.

For nodes `A`, `B` and `C` the weights for all edges must be given, as shown here:

```
AA AB AC BA BB BC CA CB CC
1, 1, 9, 9, 1, 9, 9, 9, 1
1, 9, 9, 9, 1, 7, 9, 9, 1
1, 9, 9, 9, 1, 9, 9, 9, 1
```

In this example `t` is `3`. Note that the loops `AA`, `BB`, `CC` must also be given and must be equal to `1`.

## Time to infinity

For a dataset with `t = 3` any weight above `3` will equal to *infinity*, severing the edge. Counting the number of rows in the dataset allows to determine how heavy a weight must be to *cut the edge* (in the above example the number `9` is used).

## Usage

There are just three functions (`verifyTable()`, `parseTable()` and `minTime()`). The usage of these functions is straight-forward and can be seen in the `index.html` file.
