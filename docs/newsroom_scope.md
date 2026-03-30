# Seattle University  
## Newsroom Aggregation & Configuration Enhancements  
**Date:** March 2026  

---

## Executive Summary

Seattle University seeks to enhance its Terminalfour (T4) Newsroom system by implementing a taxonomy-driven aggregation model that enables cross-departmental visibility of news content while preserving canonical ownership, site structure, and SEO integrity.

This project introduces a scalable approach where newsroom feeds are automatically generated based on shared taxonomy values, with optional editorial controls to refine content presentation. The solution must maintain performance, support existing publishing workflows (including embargo and scheduled publishing), and provide a foundation for future extensibility.

---

## Project Goals

- Enable aggregation of news content across all university newsrooms  
- Maintain a single canonical source for each story  
- Improve discoverability of relevant stories across departments  
- Support centralized governance with distributed content ownership  
- Ensure scalability and performance of the publishing system  

---

## Newsroom Aggregation Model

Newsroom feeds must be driven primarily by taxonomy.

Any news story tagged with a given School, College, Department, or Topic must automatically appear in the corresponding newsroom feed, regardless of where the story is canonically published.

The system must support multi-directional aggregation.

---

## Canonical Integrity

Each news story must maintain:

- A single canonical URL  
- A single location within the site hierarchy  
- Original breadcrumb structure  

Aggregated newsroom displays must function as listings only and link to the canonical story location.

---

## Editorial Overrides

- Feature in Main Newsroom  
- Pin content within newsroom views (per newsroom)  
- Exclude content from specific newsroom feeds (per newsroom)  

---

## Precedence Rules

1. Exclusion overrides all inclusion logic  
2. Pinning overrides default sort order  
3. Featuring increases prominence  
4. Taxonomy determines inclusion  

---

## Sorting Behavior

Default: Publish date (descending)

Overrides:
1. Pinned  
2. Featured  
3. Chronological  

---

## Taxonomy Requirements

- Controlled lists (T4)  
- Multiple values allowed  
- Required fields enforced  

---

## JSON Data Requirements

- Unique ID  
- Canonical URL  
- Publish date  
- Title  
- Summary  
- Image  
- Taxonomy fields  
- Origin  

---

## Origin Identification

Listings must indicate source newsroom.

---

## Publishing & Performance

Must support:
- Scheduled publishing  
- Immediate publishing  

Must not degrade performance.

Preferred:
- Decoupled or incremental publishing  

---

## Governance

Enforced via workflows and taxonomy controls.

---

## Summary

A scalable, taxonomy-driven newsroom system with editorial control and strong performance considerations.
