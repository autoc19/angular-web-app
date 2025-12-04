# **QA & Testing Standards: The "Two-Pillar" Strategy**

**(Unified Best Practices from TDD & E2E)**

**Philosophy:**  
We optimize for **Speed** and **Confidence**. We do NOT test framework features (Angular/PrimeNG works). We test **our business logic** and **critical user journeys**.

## **1\. Pillar 1: Unit Testing (The TDD Phase)**

**When:** During the development of logic-heavy classes.  
**Who:** Services, Stores, Utils, Validators, Pipes.  
**Tool:** Vitest (Fast, Headless).

## **🎯 最小化測試原則 (Minimalist Unit Testing)**

* **Do NOT Test:** Dumb Components (UI), Routing configurations, Standard API calls.  
* **MUST Test:**  
  * **Signals State:** "Calling `login()` should update `user()` signal and set `loading()` to false."  
  * **RxJS Streams:** "The `search$` stream should debounce input by 300ms."  
  * **Complex Algorithms:** Custom validators or data transformation logic.

## **⚙️ 工作流指令 (How to use in AI Dev)**

1. **Step 1 (Prompt):** "Create the `UserStore` logic. First, generate the **Vitest spec file**. It should verify that `loadUsers()` updates the `users` signal on success and `error` signal on failure."  
2. **Step 2 (Code):** "Now implement the `UserStore` to pass these tests."

## **2\. Pillar 2: E2E Testing (The Validation Phase)**

**When:** After a Feature is fully assembled (UI \+ Logic connected).  
**Who:** Critical Business Flows (Login, Checkout, Dashboard).  
**Tool:** Cypress or Playwright.

## **🎯 最小化測試原則 (Critical Path Only)**

* **Do NOT Test:** Edge cases of every single input field (leave that to Unit Tests).  
* **MUST Test:** "Happy Paths" (主流程).  
  * Can the user log in?  
  * Can the user create an item and see it in the list?

## **⚙️ 工作流指令 (How to use in AI Dev)**

1. **Step 1 (Prompt):** "The User Management feature is complete. Create a **Cypress E2E test**.  
2. **Pattern:** Use the **Page Object Model**. Create a `UserPage` class to encapsulate selectors (e.g., `UserPage.clickAddButton()`)."  
3. **Scenario:** "Test that a user can be added and appears in the PrimeNG table."

---

## **3\. Summary: The Development Lifecycle**

這是給 AI 的「什麼時候用什麼」的決策樹：

| 開發階段 (Phase) | 任務 (Task) | 測試動作 (QA Action) | 指令關鍵詞 (Prompt) |
| :---- | :---- | :---- | :---- |
| **1\. Logic Design** | 編寫 Service / Store / Util | **TDD (Unit Test)** | "Write spec first", "Test Signals state" |
| **2\. UI Construction** | 編寫 Dumb Component / Template | **無 (Skip)** | "No unit tests for UI components" |
| **3\. Feature Integration** | 將 Service 連接到 Component | **無 (Manual Check)** | (開發者手動點一點，確保跑通) |
| **4\. Feature Completion** | 功能開發完畢，準備提交 | **E2E Test** | "Create Cypress test", "Critical Path", "Page Object" |

## **💡 核心結論**

* **最小化測試發生在：** UI 組件層（Shared UI）。我們**不寫**組件單元測試（TestBed overhead 太重，價值太低），直接跳過。  
* **質量保證發生在兩頭：**  
  1. **源頭 (Logic):** 用 TDD 鎖死業務邏輯。  
  2. **終點 (User):** 用 E2E 鎖死用戶體驗。

這種 **「中間鬆，兩頭緊」** 的策略，是最高效的企業級開發模式。

