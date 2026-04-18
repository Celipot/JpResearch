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
- **Frontend**: Page → Components → Hooks/Utils
- **Use dependency injection** when possible

## 8. File Organization
```
back/src/
├── domain/
│   ├── entities/          (Core business logic)
│   └── shared/            (Shared types/utilities)
├── infrastructure/
│   ├── repositories/      (Data access)
│   └── data/              (Static data)
├── services/              (Orchestration)
├── controllers/           (HTTP handlers)
└── __tests__/             (Mirror src structure)
```

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
