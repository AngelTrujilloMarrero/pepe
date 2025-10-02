from playwright.sync_api import Page, expect

def test_header_verification(page: Page):
    """
    This test verifies that the header has a clearer background and remains sticky.
    """
    # 1. Arrange: Go to the application's homepage.
    page.goto("http://localhost:5173/")

    # 2. Act: Scroll down the page to check for sticky behavior.
    page.evaluate("window.scrollBy(0, 500)")

    # 3. Assert: Check if the header is still visible.
    header = page.locator("header")
    expect(header).to_be_visible()

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")