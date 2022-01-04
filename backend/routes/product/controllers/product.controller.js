const sequelize = require("sequelize");
const Op = require("sequelize").Op;
const url = require("url");
const inspect = require("util").inspect;

const { Products, Users, Comments } = require("../../../database/models");

class ProductController {
  getQueryParams = async (req, res) => {
    const { cathegory } = req.params;
    const urlParsed = url.parse(req.url, true);
    let { price, color, maker, sort, page } = urlParsed.query;
    page = page || null;
    sort = sort || null;
    price = price?.split(",").map((i) => Number(i)) || null;
    color = color?.split(",") || null;
    maker = maker?.split(",").map((s) => s && s[0] + s.slice(1)) || null;
    const minPrice = await Products.min("price", {
      where: {
        product_type: cathegory,
      },
    });
    const maxPrice = await Products.max("price", {
      where: {
        product_type: cathegory,
      },
    });
    return { cathegory, price, color, maker, minPrice, maxPrice, sort };
  };

  getFilters = async (req, res) => {
    const { maker, color, minPrice, maxPrice, sort, price, cathegory } =
      await this.getQueryParams(req, res);
    const colors = await Products.findAll({
      attributes: ["color"],
      raw: true,
      group: ["color"],
      where: {
        product_type: cathegory,
      },
    }).then((res) => res.map((i) => i.color));

    const makers = await Products.findAll({
      attributes: ["maker"],
      raw: true,
      group: ["maker"],
      where: {
        product_type: cathegory,
      },
    }).then((makers) => makers.map((i) => i.maker));
    const filters = [
      {
        title: "Price",
        params: {
          entityType: "range",
          queryValue: "price",
          min: minPrice,
          max: maxPrice,
          values: [
            (price && Math.min(...price)) || minPrice,
            (price && Math.max(...price)) || maxPrice,
          ],
        },
        type: "range",
        active: price ? true : false,
      },
      {
        title: "Color",
        items: colors.map((i) => ({
          entityType: "checkbox",
          queryValue: "color",
          value: i,
          active: color && color.includes(i) ? true : false,
        })),
        type: "checkbox",
      },
      {
        title: "Maker",
        items: makers.map((i) => {
          return {
            entityType: "checkbox",
            queryValue: "maker",
            value: i,
            active: maker && maker.includes(i) ? true : false,
          };
        }),
        type: "checkbox",
      },
    ];
    res.send({
      filters,
    });
  };

  getProductsGrid = async (req, res) => {
    const { maker, color, minPrice, maxPrice, sort, price, cathegory } =
      await this.getQueryParams(req, res);
    const { page } = req.query;
    const productData = await Products.findAndCountAll({
      raw: true,
      where: {
        maker: maker || [sequelize.literal("SELECT maker FROM products")],
        color: color || [sequelize.literal("SELECT color FROM products")],
        price: {
          [Op.between]: price || [minPrice, maxPrice],
        },
        product_type: cathegory,
      },
      order: sort
        ? [["price", sort === "cheap" ? "ASC" : "DESC"]]
        : [["price", "ASC"]],
      offset: page && page > 0 ? page * 8 - 8 : 0,
      limit: 8,
    });
    const withCommentsCount = await Promise.all(
      productData.rows.map(async (i) => {
        const commentsCounter = await Comments.count({
          where: {
            product_url: i.url,
          },
          attributes: ["product_url"],
          group: ["product_url"],
        });
        return {
          ...i,
          commentsCounter: Number(commentsCounter[0]?.count) || 0,
        };
      })
    );
    res.send({
      data: [...withCommentsCount],
      count: productData.count,
    });
  };

  getProductProfile = async (req, res) => {
    const { url } = req.params;

    const productData = await Products.findOne({
      raw: true,
      where: {
        url,
      },
    });

    const comments = await Comments.findAll({
      where: {
        product_url: url,
      },
      include: {
        model: Users,
        attributes: ["username", "avatar"],
      },
      // attributes: ["comments"],
    });

    const withUsers = await Promise.all(
      comments.map(async (i) => {
        let subcomments = await Promise.all(
          i.subcomments.map(async (i) => {
            const { username, avatar } = await Users.findOne({
              where: {
                user_url: i.user_url,
              },
            });

            return {
              ...i,
              user: {
                username,
                avatar,
              },
            };
          })
        );
        return {
          ...JSON.parse(JSON.stringify(i)),
          subcomments,
        };
      })
    );

    res.send({
      productData: {
        ...productData,
        comments: withUsers,
      },
    });
  };

  getProductStats = async (req, res) => {
    const { url } = req.params;
    const comments = await Comments.findAll({
      // raw: true,
      nest: false,
      where: {
        product_url: url,
      },
      include: {
        model: Users,
        attributes: ["username", "avatar"],
      },
    });
    res.send({
      comments,
    });
  };

  getProductPhotos = async (req, res) => {
    const { url } = req.params;
    const {
      image_set: { images },
    } = await Products.findOne({
      where: {
        url,
      },
      attributes: ["image_set"],
    });
    res.send({ images });
  };

  getProductComments = async (req, res) => {
    const { url } = req.params;
    const comments = await Comments.findAll({
      where: {
        product_url: url,
      },
    });
    res.send({ comments });
  };

  getProductTopcomments = async (req, res) => {
    const { url } = req.params;

    const mostLiked = await Comments.findAll({
      where: {
        product_url: url,
      },
      order: [["likes", "DESC"]],
      include: {
        model: Users,
        attributes: ["username", "avatar"],
      },
    });
    res.send({ mostLiked: mostLiked.slice(0, 2) });
  };
  searchProduct = async (req, res) => {
    const { name } = req.query;
    const products = await Products.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: 5,
    });
    res.send({ products });
  };
}

module.exports = ProductController;
