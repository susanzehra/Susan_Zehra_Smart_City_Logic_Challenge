# Lab 14 — Logic, Resolution, and First-Order Reasoning

**Topic:** CNF, Resolution, First-Order Logic, and Quantifiers  
**Points:** 10  
**Submission:** One certificate as PDF, PNG, JPG, or JPEG

## Learning Objectives

After completing this lab, you should be able to:

- recognize literals, clauses, and CNF sentences;
- apply the propositional resolution rule;
- explain proof by refutation and the meaning of the empty clause;
- identify constants, variables, predicates, and functions in first-order logic;
- translate simple real-world policies into first-order logic; and
- interpret universal and existential quantifiers, including changes in quantifier order.

## Quick Concept Review

### Conjunctive Normal Form

A formula is in **conjunctive normal form (CNF)** when it is an AND of one or more clauses. Each clause is an OR of literals. A literal is a proposition or its negation.

Example:

**(¬P ∨ Q) ∧ (R ∨ ¬S)**

To convert an implication, use **P → Q ≡ ¬P ∨ Q**. If needed, apply De Morgan’s law and distribute OR over AND.

### Resolution and Refutation

Resolution combines two clauses that contain complementary literals.

From **(P ∨ Q)** and **(¬P ∨ R)**, resolution produces **(Q ∨ R)**.

To prove that a knowledge base entails a query α:

1. Add **¬α** to the knowledge base.
2. Convert the sentences into CNF clauses.
3. Apply resolution repeatedly.
4. If the empty clause **□** is derived, a contradiction has been found and the original query is entailed.

### First-Order Logic

First-order logic represents objects, their properties, and relationships.

- **Constant:** names one object, such as `robot1`.
- **Variable:** represents an unspecified object, such as `x`.
- **Predicate:** describes a property or relationship, such as `Damaged(x)` or `Serves(x,y)`.
- **Function:** returns an object, such as `ManagerOf(x)`.
- **Domain:** the collection of objects being discussed.

### Quantifiers

- **∀x** means “for every x.”
- **∃x** means “there exists at least one x.”

Universal categories commonly use implication:

**∀x(Robot(x) → Safe(x))**

Existential claims commonly use conjunction:

**∃x(Robot(x) ∧ Safe(x))**

Quantifier order matters. **∀x∃y Serves(x,y)** allows different robots to serve different stations. **∃y∀x Serves(x,y)** says that one particular station is served by every robot.

## Interactive Activity

Open the following website:

**[Susan Zehra’s Smart City Logic Challenge — LINK WILL BE ADDED HERE]**

Enter your name and complete all seven missions. The website does not transmit or store your name.

During the activity, you will:

1. classify logical evidence;
2. arrange the steps of a CNF conversion;
3. resolve clauses and derive the empty clause;
4. complete a proof by refutation;
5. identify the components of a first-order language;
6. translate smart-city policies into first-order logic; and
7. interpret quantified statements in a visual model.

Read the information shown in each mission before answering. If you are uncertain, open **Need a hint?** Hints guide your reasoning but do not directly complete the activity. Incorrect answers may be revised and checked again.

## What to Submit

After all seven missions are completed, a personalized certificate will appear.

1. Select **Print or Save as PDF**, or take a clear screenshot.
2. Confirm that your name and completion date/time are visible.
3. Upload the certificate to this Canvas question.

Accepted file types: **PDF, PNG, JPG, or JPEG**.

## Grading — 10 Points

| Requirement | Points |
|---|---:|
| Successfully completes all seven interactive missions | 7 |
| Certificate clearly shows the student’s name | 1 |
| Completion date and time are visible | 1 |
| Correct, readable file is uploaded | 1 |
| **Total** | **10** |

The certificate is produced only after all activities have been completed correctly.
