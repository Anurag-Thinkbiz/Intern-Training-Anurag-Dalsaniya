import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";
import MockAdapter from "axios-mock-adapter";
import useGetDetails from "../../hooks/useDetails";
import { API } from "../../services/service";
import { URLConstant } from "../../utils/Constants/URLConstant";
import { userTypeForHook } from "../../data/modal/types/hookTypes/hookType";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("useGetDetails Hook", () => {
  const mock = new MockAdapter(API);

  afterEach(() => {
    mock.reset();
  });

  it("should return user details when API call is successful", async () => {
    const mockData: userTypeForHook = {
      name: "John Doe",
      email: "john.doe@example.com",
      address: "sidsar",
      password: "anuragSid123@",
      role: "user",
    };

    mock.onGet(`/${URLConstant.DETAILS}`).reply(200, mockData);

    const { result } = renderHook(() => useGetDetails());
    const data = await result.current.getDetails();

    expect(data).toEqual(mockData);
  });

  it("should show error toast when API call fails", async () => {
    mock.onGet(`/${URLConstant.DETAILS}`).reply(500);

    const { result } = renderHook(() => useGetDetails());
    const data = await result.current.getDetails();

    expect(data).toBeUndefined();
    expect(toast.error).toHaveBeenCalledWith(
      "Error: Request failed with status code 500"
    );
  });
});
