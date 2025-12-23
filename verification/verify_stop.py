from playwright.sync_api import sync_playwright, expect
import time

def verify_stop_button():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        print("Navigating to game...")
        page.goto("http://localhost:5173/scratch-intern-projec/")

        # Wait for loading
        page.wait_for_load_state("networkidle")

        print("Starting game...")
        # Click "BẮT ĐẦU MỚI" (Start Game)
        page.get_by_text("BẮT ĐẦU MỚI").click()

        print("Selecting Character...")
        time.sleep(1)
        # Click the first image found (assuming it's a character)
        page.locator("img").first.click()

        print("Waiting for Difficulty Selection...")
        # Screenshot showed text "EASY", "NORMAL", "HARD"
        # And "CHỌN ĐỘ KHÓ"
        # It seems the text "Dễ" is NOT there, it says "EASY".

        # Click "EASY"
        # Use get_by_text("EASY")
        try:
            page.get_by_text("EASY").click()
            print("Selected Difficulty: EASY")
        except:
            print("Could not find 'EASY', trying generic...")
            page.screenshot(path="verification/stuck_easy.png")
            return

        print("Game loaded. Waiting for interaction...")
        time.sleep(2)

        print("Clicking a block...")
        # Searching for "Move"
        # GamePanel usually has blocks.
        block = page.locator("text=Move").first
        if not block.is_visible():
             # Try finding by class or structure if text varies
             # Blocks have border-2 and rounded-2xl
             block = page.locator(".rounded-2xl.border-2").first

        if block.count() > 0:
            block.click()
            print("Block clicked.")

            # Immediately check for the Stop button
            # Button text: "DỪNG & TIẾP TỤC"
            # It has class bg-rose-600

            stop_btn = page.get_by_text("DỪNG & TIẾP TỤC")

            try:
                # It might appear with animation, wait a bit
                stop_btn.wait_for(state="visible", timeout=3000)
                print("Stop button found!")

                # Take screenshot of the Stop button
                page.screenshot(path="verification/stop_button_visible.png")

                # Click the Stop button
                stop_btn.click()
                print("Stop button clicked.")

                # Verify "Continue" button appears (Tiếp tục)
                # Text: "Tiếp tục" or "Tự động chuyển sau"
                continue_btn = page.get_by_text("Tiếp tục")
                continue_btn.wait_for(state="visible", timeout=3000)
                print("Continue button found!")

                page.screenshot(path="verification/continue_button_visible.png")
            except Exception as e:
                print(f"Failed to find buttons: {e}")
                page.screenshot(path="verification/fail_state.png")
        else:
            print("No blocks found to click.")
            page.screenshot(path="verification/no_blocks.png")

        browser.close()

if __name__ == "__main__":
    verify_stop_button()
