from playwright.sync_api import sync_playwright

def verify_stage(page):
    # Go to app
    page.goto("http://localhost:5173")

    # Wait for Play button (Bắt đầu mới)
    page.wait_for_selector("text=Bắt đầu mới")
    page.get_by_text("Bắt đầu mới").click()

    # Wait for Character Selection (assumed step before or after difficulty?)
    # Based on `DifficultySelection.jsx`, the back button says "Chọn lại nhân vật" (Reselect Character), so Character Selection comes BEFORE Difficulty.

    # CHARACTER SELECTION SCREEN
    # Let's find a character to click. Assuming they are images or buttons.
    # We can try to click on a known text or just wait and click coordinates if needed.
    # Looking for "CHỌN NHÂN VẬT" or similar.
    # Let's try to find an image with src containing 'Pink_Monster'

    try:
        page.wait_for_selector("img[src*='Pink_Monster.png']", timeout=5000)
        page.click("img[src*='Pink_Monster.png']")
        # There might be a confirm button "SẴN SÀNG"
        if page.is_visible("text=SẴN SÀNG"):
            page.click("text=SẴN SÀNG")
    except:
        print("Character selection might be skipped or different")

    # DIFFICULTY SELECTION SCREEN
    # Text is "EASY", "NORMAL", "HARD"
    page.wait_for_selector("text=EASY")
    page.get_by_text("EASY").click()

    # GAME SCREEN
    # Wait for "Coordinates"
    page.wait_for_selector("text=Coordinates", timeout=15000)

    # Wait for animation to settle
    page.wait_for_timeout(2000)

    # Check if Stage is visible
    page.screenshot(path="verification/stage_optimized.png")
    print("Screenshot taken")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_stage(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
