# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Root (runs both back and front)
```bash
npm run dev          # start back (port 3001) + front (Vite, port 5173) concurrently
npm test             # run all tests
npm run lint         # lint both
npm run format       # format both
```

### Backend (`cd back` or use `--prefix back`)
```bash
npm run dev          # tsx watch — hot-reload dev server
npm test             # vitest run
npm run typecheck    # tsc --noEmit
# Run a single test file:
npx vitest run src/__tests__/domain/entities/verb/Verb.test.ts
```

### Frontend (`cd front` or use `--prefix front`)
```bash
npm run dev          # Vite dev server (proxies /api → localhost:3001)
npm test             # vitest run
npm run typecheck    # tsc --noEmit
# Run a single test file:
npx vitest run src/__tests__/hooks/useRevisionSession.test.ts
```

## Architecture

This is a Japanese language revision app — a monorepo with an Express backend (`back/`) and a React frontend (`front/`). In production the backend serves the built frontend as static files.

### Backend domain model

Each Japanese concept (verb, adjective, number, hour, date) follows the same flow:

```
Controller → Service → Domain Entity + Repository
```

- **Domain entities** (`back/src/domain/entities/`) encapsulate conjugation logic. `Verb` and `Adjective` are the core classes. Each has a `conjugate(form)` method and an `acceptableAnswers(form)` method that returns all valid answers (including kana/kanji variants and polite-negative variants).
- **Form types** (`VerbConjugationForm`, `AdjectiveConjugationForm`) are discriminated unions — each `kind` determines which fields are present (e.g. `kind: 'indicative'` has tense + polarity + register; `kind: 'te'` has only polarity).
- `VerbConjugationFormUtils.getRandomForm()` selects a random form from all combinations — this is called by the service on every request.
- **Repositories** (`back/src/infrastructure/repositories/`) load static word lists from `back/src/infrastructure/data/` (TypeScript arrays, not a database).
- **Services** (`back/src/services/`) pick a random word, instantiate the entity, call `acceptableAnswers`, and return a plain result object to the controller.
- `/api/check-answer` (POST) normalises the user's answer server-side (romaji → hiragana, trim) and compares against the expected answers array.
- **`back/src/routes/contracts.ts`** — typed request interfaces per route (`VerbReq`, `NumberReq`, `CheckAnswerReq`). Controllers import these instead of the generic Express `Request`.
- **`back/src/routes/apiRouter.ts`** — registers all API routes from a typed `RouteDefinition[]` array iterated in a loop.

### Frontend pages and routing

Six pages, each following the same pattern: fetch a random item → display it → accept typed answer → POST to `/api/check-answer`.

| Route | Page |
|---|---|
| `/` | `HomePage` |
| `/revision` | `NumberRevisionPage` |
| `/hour` | `HourRevisionPage` |
| `/date` | `DateRevisionPage` |
| `/adjective` | `AdjectiveRevisionPage` |
| `/verb` | `VerbRevisionPage` |

- **`useRevisionSession`** hook holds all shared session state: `loading`, `userAnswer`, `feedback`, `showPronunciation`, and `reset()`. Every revision page uses it.
- **`revisionService`** owns all `fetch` calls to the API.
- Components follow Atomic Design: `atoms/` → `molecules/` (e.g. `AnswerInput`, `FeedbackDisplay`) → `organisms/` (e.g. `ModeSelector`, `PronunciationPanel`).
- `VerbForm` and `AdjectiveResult` types in `front/src/types/revision.ts` mirror the backend's domain types as plain string-literal unions (no enums on the frontend).

---

# Code Quality Standards

## 1. Minimal Comments
- Code must be self-explanatory through clear naming and structure
- **REQUIRED**: Use `// Given`, `// When`, `// Then` in all tests (mandatory structure)
- **Avoid**: All other comments (explanations, reasoning, clarifications)
- Method/function names should express intent clearly

## 2. Test Naming and Structure

### Test Name Format: `when X, then Y`
```typescript
it('when conjugating たかい to present_negative, then returns たかくない', () => {
  const adj = new Adjective('たかい', 'i', 'high/expensive');
  const result = adj.conjugate('present_negative');
  expect(result).toBe('たかくない');
});
```

### Test Body: Always use Given-When-Then structure with comments
```typescript
it('when submitting correct answer, then shows success feedback', async () => {
  // Given
  mockFetch(mockAdjective);
  const { getByRole, getByText } = render(component);

  // When
  fireEvent.click(getByRole('button', { name: /Submit/ }));

  // Then
  expect(getByText(/✓ Correct/)).toBeInTheDocument();
});
```

## 3. Clean Code Principles
- **Single Responsibility**: One class = one reason to change
- **DRY**: No duplicated logic
- **KISS**: Keep it simple. Avoid over-engineering
- **Meaningful Names**: 
  - Functions: verb + noun (e.g., `conjugateIAdjective`, `getRandomAdjective`)
  - Variables: clear intent (e.g., `presentNegativeForm` not `form2`)
  - Tests: describe the exact behavior being tested
- **Small Functions**: Max 20 lines per function
- **Avoid Magic Numbers**: Use named constants
- **Type Safety**: Leverage TypeScript types, avoid `any`

## 4. Object-Oriented Programming
- **Encapsulation**: Hide internal state, expose only necessary public interfaces
- **Single Responsibility Principle (SRP)**: Each class has one reason to change
- **Polymorphism**: Use interfaces/inheritance for flexible, extensible designs
  - Prefer composition over inheritance
  - Use enums with namespaces for domain utilities (e.g., `AdjectiveForm.getRandomForm()`)
- **Abstraction**: Model domain concepts directly (e.g., `Adjective` class, `AdjectiveType` enum)
- **Immutability**: Prefer `readonly` properties, avoid unnecessary state mutations
- **No god objects**: Classes should not do too many things; break large classes into smaller ones

## 5. TDD Discipline
- Write test first (RED)
- Implement minimum code to pass (GREEN) — **no more code than necessary to pass tests**
- Refactor (REFACTOR)
- No test, no code
- **During GREEN phase, never modify tests** — if the test needs changing, it's a new RED cycle
- Test one behavior per test
- Use `describe` for grouping logically related tests
- **Strict minimalism**: If code isn't required to pass any test, don't write it
  - No hypothetical features
  - No "future-proofing"
  - No utility functions for single use
  - No overengineering for perceived needs

## 6. Cyclomatic Complexity
- **Target**: Max 3 per function
- **Avoid**:
  - Deeply nested if/else chains (use guard clauses)
  - Large switch statements (use maps/polymorphism)
  - Complex boolean logic (extract to helper functions)
- **Example (Bad)**:
  ```typescript
  if (type === 'i') {
    if (form === 'present_negative') {
      if (hiragana === 'いい') {
        return 'よくない';
      } else {
        // logic
      }
    }
  }
  ```
- **Example (Good)**:
  ```typescript
  if (isSpecialCase(type, form, hiragana)) {
    return getSpecialConjugation();
  }
  return getStandardConjugation();
  ```

## 7. Architecture Rules
- **Backend**: Controllers → Services → Domain Entities + Infrastructure (Repositories)
- **No business logic in controllers**
- **Repositories**: Data access only, not business logic
- **Services**: Orchestrate domain logic
- **Entities**: Immutable when possible, encapsulate invariants
- **Frontend**: Pages → Components → Hooks → Services → Types
- **Use dependency injection** when possible

### Frontend layer responsibilities
- **`types/`**: Shared TypeScript interfaces and types — no logic
- **`services/`**: All backend API calls — no state, no UI
- **`hooks/`**: Reusable stateful logic shared across pages (e.g. `useRevisionSession`, `useSpeech`) — no JSX
- **`components/`**: Stateless UI blocks driven by props — no direct API calls, no fetch. Organized following **Atomic Design**:
  - `atoms/` — indivisible elements (single Button, Badge, Icon)
  - `molecules/` — combinations of atoms with one clear purpose (AnswerInput, FeedbackDisplay)
  - `organisms/` — complex functional blocks composed of molecules/atoms (ModeSelector, PronunciationPanel)
- **`pages/`**: Assemble organisms, molecules and hooks — minimal logic (~50 lines max)
- **Rules**:
  - No `fetch` calls outside `services/`
  - No duplicated state logic across pages — extract to a hook
  - No duplicated JSX blocks across pages — extract to a component
  - Components receive data and callbacks via props only
  - Atoms have no dependencies on other components; molecules depend only on atoms; organisms can depend on molecules and atoms

## 8. File Organization
```
back/src/
├── domain/
│   ├── entities/          (Core business logic, domain utilities)
│   └── shared/            (Shared types)
├── infrastructure/
│   ├── repositories/      (Data access)
│   └── data/              (Static data)
├── services/              (Orchestration)
├── controllers/           (HTTP handlers)
└── __tests__/             (Mirror src structure)
    ├── domain/entities/
    ├── infrastructure/
    ├── services/
    └── controllers/

front/src/
├── types/                 (Shared TypeScript interfaces)
├── services/              (API calls only)
├── hooks/                 (Reusable stateful logic)
├── components/
│   ├── atoms/             (Indivisible UI elements)
│   ├── molecules/         (Combinations of atoms)
│   └── organisms/         (Complex functional blocks)
├── pages/                 (Page assemblies)
└── __tests__/
    ├── services/
    ├── hooks/
    └── components/
        ├── atoms/
        ├── molecules/
        └── organisms/
```
- **Domain entities**: May contain internal utilities, namespaces, or helper functions for domain logic
  - Example: `AnswerCheck` namespace in `src/domain/entities/AnswerCheck.ts` provides `isCorrect()`
- **Test file placement**: Test files MUST be in `__tests__/` mirroring the source structure
  - Example: `src/domain/entities/AnswerCheck.ts` → `src/__tests__/domain/entities/AnswerCheck.test.ts` or `src/__tests__/utils/AnswerCheck.test.ts` (for integration tests)
  - Example: `src/controllers/foo.ts` → `src/__tests__/controllers/foo.test.ts`
  - Tests are NOT placed alongside source files

## 9. Type Safety
- Avoid `any` type
- Use discriminated unions for type narrowing
- Use branded types for domain concepts
- Example:
  ```typescript
  type AdjectiveForm = 'present_affirmative' | 'present_negative';
  type AdjectiveType = 'i' | 'na';
  ```

## 10. Error Handling
- Throw errors for truly exceptional cases
- Return `undefined` or `null` for expected empty states (guard clauses)
- Validate at system boundaries (controller input)
- Trust internal code and type system

## 11. Testing Standards
- Each test: one assertion or related assertions on same output
- Use `beforeEach` to set up fixtures
- Mock external dependencies
- Test behavior, not implementation
- Integration tests: no mocks (test real database, real API, etc)
