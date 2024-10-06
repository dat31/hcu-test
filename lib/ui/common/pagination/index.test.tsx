import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Pagination from "./index";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname() {
    return "";
  },
  useSearchParams() {
    return {};
  },
}));

describe("Pagination", () => {
  it("should display pagination", async () => {
    render(<Pagination totalPages={1} currentPage={1} />);
    const pagItem = screen.getByText("1");
    expect(pagItem).toBeTruthy();
  });

  it("should display eclipses when page number > 6", async () => {
    render(<Pagination totalPages={10} currentPage={1} />);
    expect(screen.getByText("More pages")).toBeTruthy();
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
