from playwright.sync_api import sync_playwright, expect
import time

def verify_fix(page):
    # 1. Load the game
    print("Loading game...")
    page.goto("http://localhost:5173")

    # Wait for game to load (look for a known element, e.g., 'Level 1' or lives count)
    print("Waiting for game start...")
    # Assuming the game starts immediately or after a short loading
    try:
        page.wait_for_selector("text=Mạng", timeout=10000)
    except:
        print("Could not find 'Mạng', maybe in a menu? checking buttons...")

    # Check if there is a 'Play' button or we are already in game
    # Based on GameScreen code, it seems to render directly if difficulty is set?
    # App.jsx likely handles the routing. Let's assume we are in the game or need to click 'Start'.
    # I'll check for a 'Start' or 'Chơi ngay' button just in case, but based on previous context, user might be deep in game.
    # However, 'GameScreen' is likely a child of 'App'.

    # Let's try to find a wrong answer block to click.
    # We need to lose 5 lives.
    print("Attempting to lose 5 lives...")

    # Loop to lose lives
    for i in range(5):
        print(f"Losing life {i+1}...")
        # Find a block that is NOT the correct one.
        # Ideally, we just click the first one and hope it's wrong, or try to identify.
        # But 'GameScreen' logic: `handleBlockClick`.
        # We need to wait for blocks to appear.
        page.wait_for_selector(".cursor-pointer", timeout=5000) # Assuming blocks have this class or similar

        # Click a random block.
        # Note: If we click correct, we advance. If wrong, we lose a life.
        # To ensure we lose, we might need to guess. Or just click the first one.
        # If it's correct, we move to next level.
        # This is tricky.

        # HACK: We can just use `page.evaluate` to set the state directly if we could access React state, but we can't easily.
        # BETTER HACK: We can trigger the 'wrong' path by clicking something that we know is wrong?
        # Without knowing the question, it's hard.
        # However, the user provided an image of Game Over.

        # Let's try to click the first option 5 times. If it's correct, we move level and try again.
        # Eventually we will fail enough times? Or maybe we accidentally win all? Unlikely.

        blocks = page.locator(".cursor-pointer") # Adjust selector based on 'GamePanel'
        # Actually let's look at GamePanel code or just guess selectors.
        # Blocks seem to be in 'GamePanel'.

        # Let's try clicking the first block available.
        if blocks.count() > 0:
            blocks.first.click()
        else:
            # Maybe use text selector if specific classes aren't obvious
            # The code has `currentLevel.options`.
            pass

        # Wait a bit for animation/feedback
        time.sleep(1)

    # After loop, check for Game Over modal.
    # Game Over modal has text "GAME OVER" or "hết mạng".
    print("Checking for Game Over...")
    try:
        page.wait_for_selector("text=GAME OVER", timeout=5000)
        print("Game Over screen detected.")
    except:
        print("Game Over not found yet. Trying to click more...")
        # Try clicking more times if needed
        for i in range(10):
            page.mouse.click(200, 400) # Blind click? No.
            # Let's try looking for any text that looks like a block
            blocks = page.locator("div[class*='border-l-4']") # From GamePanel styles?
            if blocks.count() > 0:
                blocks.first.click()
            time.sleep(0.5)
            if page.locator("text=GAME OVER").count() > 0:
                break

    expect(page.locator("text=GAME OVER")).to_be_visible()

    # 2. Click Settings in ResultModal
    print("Clicking Settings button in ResultModal...")
    # Button has text "SETTINGS" or icon ⚙️
    settings_btn = page.locator("button", has_text="SETTINGS")
    settings_btn.click()

    # 3. Verify
    print("Verifying modals...")
    time.sleep(1) # Wait for animation

    # ResultModal should be gone (or at least hidden).
    # SettingsModal should be visible.

    # Check SettingsModal visibility (Has text "CÀI ĐẶT" or "System Configuration")
    expect(page.locator("text=CÀI ĐẶT")).to_be_visible()

    # Check ResultModal visibility
    # It should NOT be visible.
    # Note: `to_be_hidden` checks if attached but not visible, or detached.
    # Our code: `{modal && !showSettings && ...}` -> It should be detached (not in DOM).

    result_modal_text = page.locator("text=GAME OVER")
    if result_modal_text.count() == 0:
        print("SUCCESS: ResultModal is not in DOM.")
    else:
        # If it is in DOM, check visibility
        if not result_modal_text.is_visible():
             print("SUCCESS: ResultModal is hidden.")
        else:
             print("FAILURE: ResultModal is still visible!")
             # Take screenshot of failure

    # Take screenshot
    page.screenshot(path="/home/jules/verification/verification.png")
    print("Screenshot taken.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_fix(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
